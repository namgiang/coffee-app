import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Flavor, UserFlavor } from '../models/index';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    const defaultFlavors: any[] = [
        {
            id: 1,
            name: 'Coffee Type 1',
            type: 'coffee',
            profile: 'very bitter',
            departmentId: 1
        },
        {
            id: 2,
            name: 'Coffee Type 2',
            type: 'coffee',
            profile: 'great smell',
            departmentId: 1
        },
        {
            id: 3,
            name: 'Green Tea',
            type: 'tea',
            profile: 'lots of anti-oxidant',
            departmentId: 1
        },
        {
            id: 4,
            name: 'Sencha Tea',
            type: 'tea',
            profile: 'Japanese green tea',
            departmentId: 1
        },
    ];

    const defaultDepartments = [
        {
            id: 1,
            name: 'IT Department'
        }
    ]

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let departments: any[] = JSON.parse(localStorage.getItem('departments')) || defaultDepartments;
    let flavors: Flavor[] = JSON.parse(localStorage.getItem('flavors')) || defaultFlavors;
    let userFlavors: UserFlavor[] = JSON.parse(localStorage.getItem('user-flavors')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }

                return;
            }

            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // get all departments
            if (connection.request.url.endsWith('/api/departments') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: departments })));
                return;
            }

            // create new department
            if (connection.request.url.endsWith('/api/departments') && connection.request.method === RequestMethod.Post) {
                let newDepartment = JSON.parse(connection.request.getBody());

                // validation
                let duplicateDepartment = departments.filter(department => { return department.name === newDepartment.name; }).length;
                if (duplicateDepartment) {
                    return connection.mockError(new Error('Department "' + newDepartment.name + '" is already created'));
                }

                // save new department
                newDepartment.id = departments.length + 1;
                departments.push(newDepartment);
                localStorage.setItem('departments', JSON.stringify(departments));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete a department
            if (connection.request.url.match(/\/api\/departments\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                let urlParts = connection.request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < departments.length; i++) {
                    let department = departments[i];
                    if (department.id === id) {
                        // delete department
                        departments.splice(i, 1);
                        localStorage.setItem('departments', JSON.stringify(departments));
                        break;
                    }
                }

                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // get flavors by id
            if (connection.request.url.match(/\/api\/flavors\/\d+$/) && connection.request.method === RequestMethod.Get) {
                let urlParts = connection.request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedFlavors = flavors.filter(flavor => { return flavor.departmentId === id; });

                // respond 200 OK with user
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedFlavors })));

                return;
            }

            // create new flavor
            if (connection.request.url.endsWith('/api/flavors') && connection.request.method === RequestMethod.Post) {
                let newFlavor = JSON.parse(connection.request.getBody());

                // validation
                let duplicateFlavor = flavors.filter(flavor => { return flavor.name === newFlavor.name; }).length;
                if (duplicateFlavor) {
                    return connection.mockError(new Error('Flavor "' + newFlavor.name + '" is already created'));
                }

                // save new department
                newFlavor.id = flavors.length + 1;
                flavors.push(newFlavor);
                localStorage.setItem('flavors', JSON.stringify(flavors));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: newFlavor })));

                return;
            }

            // get user-flavor by userId and flavorId
            if (connection.request.url.match(/\/api\/user-flavors\/\d+\/\d+$/) && connection.request.method === RequestMethod.Get) {
                let urlParts = connection.request.url.split('/');
                console.log(urlParts);
                let userId = parseInt(urlParts[urlParts.length - 2]);
                let flavorId = parseInt(urlParts[urlParts.length - 1]);
                let matchedUserFlavor = userFlavors.filter(item => { return item.userId === userId && item.flavorId === flavorId; });

                if (matchedUserFlavor) {
                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedUserFlavor[0] })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }


                return;
            }

            // create/update a user-flavor
            if (connection.request.url.endsWith('/api/user-flavors') && connection.request.method === RequestMethod.Post) {
                let userFlavor = JSON.parse(connection.request.getBody());

                let duplicated = userFlavors.filter(item => { return item.userId === userFlavor.userId && item.flavorId === userFlavor.flavorId; });
                if (duplicated.length) {
                    userFlavor.id = duplicated[0].id;
                    for (let i = 0; i < userFlavors.length; i++) {
                        let item = userFlavors[i];
                        if (item.id === userFlavor.id) {
                            userFlavors[i].rating = userFlavor.rating || 0;
                            userFlavors[i].note = userFlavor.note || item.note;
                            localStorage.setItem('user-flavors', JSON.stringify(userFlavors));
                            break;
                        }
                    }
                } else {
                    userFlavor.id = userFlavors.length + 1;
                    if (!userFlavor.note) {
                        userFlavor.note = '';
                    }
                    if (!userFlavor.rating) {
                        userFlavor.rating = 0;
                    }
                    userFlavors.push(userFlavor);
                    localStorage.setItem('user-flavors', JSON.stringify(userFlavors));
                }

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
