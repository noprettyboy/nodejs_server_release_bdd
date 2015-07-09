/**
 * @file: permissionController
 * @author: wenghanyi
 */

app.controller('permissionController', ['$scope', '$routeParams', '$location', 'httpTemplate', 'CONFIG',
    function ($scope, $routeParams, $location, httpTemplate, CONFIG) {

        $('div#header ul.nav li').removeClass('current-li');

        $scope.exit = function () {
            // $location.path($routeParams.backLoc.replace(/-/g, '/'));
            // $location.state();
            $location.path('/');
        };


        /////////////////////////////////////////////////////////////////////
        // user Model
        var myInfo = {
            userId: 0,
            userName: '',
            roles: [],
            getBasic: function (data) {
                this.userId = data.id;
                this.userName = data.name;
            },
            getRoles: function (data) {
                var self = this;
                var users = data.users;
                var me = users.findObjItemByKey('userId', self.userId);
                if (me) {
                    var rolesTmp = [];
                    me[0].roles.forEach(function (r) {
                        rolesTmp.push(r.roleName);
                    });
                    self.roles = rolesTmp;
                }
            },
            iAmSuper: {
                really: false,
                roleAdding: {
                    name: '',
                    role: '',
                    valid: false,
                    wn: (function () {
                        return $scope.$watch(function () {
                            if (myInfo.iAmSuper.roleAdding.name && myInfo.iAmSuper.roleAdding.role) {
                                myInfo.iAmSuper.roleAdding.valid = true;
                            }
                            else {
                                myInfo.iAmSuper.roleAdding.valid = false;
                            }
                        });
                    })()
                },
                roles: {},
                gen: function (data) {
                    var roles = data.roles;
                    var permissions = data.permissions;
                    var self = this;
                    if (permissions.length) {
                        self.really = true;
                    }
                    else {
                        self.really = false;
                    }

                    var rolesTmp = {};
                    roles.forEach(function (r) {
                        var roleObj = {
                            name: r.name,
                            role: r.role,
                            permissions: [],
                            permissionAdding: {
                                info: '',
                                res: '',
                                resType: '',
                                op: {
                                    selected: 'r',
                                    options: ['c', 'r', 'u', 'd']
                                },
                                valid: false,
                                wn: (function () {
                                    return $scope.$watch(
                                        function () {
                                            if (roleObj.permissionAdding.res && roleObj.permissionAdding.resType) {
                                                roleObj.permissionAdding.valid = true;
                                            }
                                            else {
                                                roleObj.permissionAdding.valid = false;
                                            }
                                        }
                                    );
                                })()
                            },
                            status: true
                        };
                        rolesTmp[r.id] = roleObj;
                    });
                    permissions.forEach(function (o) {
                        if (rolesTmp.hasOwnProperty(o.roleId)) {
                            rolesTmp[o.roleId].permissions.push({
                                pId: o.id,
                                info: o.info,
                                op: o.op,
                                res: o.resource,
                                resType: o.resourceType,
                                status: true
                            });
                        }
                        // for those permission with unkown roleId, just ignore !

                    });

                    // clean watch if need
                    for (var prop in self.roles) {
                        if (self.roles.hasOwnProperty(prop)) {
                            var item = self.roles[prop];
                            if (item.permissionAdding && item.permissionAdding.wn) {
                                item.permissionAdding.wn();
                            }
                        }
                    }

                    // re-assign roles
                    self.roles = rolesTmp;
                },
                click: {
                    delRole: function (roleId) {
                        console.log('roleId = ' + roleId + ' will be deleted.');
                        myInfo.iAmSuper.roles[roleId].status = false;
                        httpTemplate('DELETE', CONFIG.userAdminRole, {roleId: roleId},
                            function (res) {
                                console.log('Delete done!');
                                getAllUsersInfo();
                            },
                            function () {
                                myInfo.iAmSuper.roles[roleId].status = true;
                            }
                        );
                    },
                    delPermission: function (roleId, permissionId) {
                        console.log('permissionId = ' + permissionId + ' will be deleted.');
                        var pArr = myInfo.iAmSuper.roles[roleId].permissions;
                        var pO   = pArr.findObjItemByKey('pId', permissionId);
                        if (pO) {
                            pO[0].status = false;
                        }
                        httpTemplate('DELETE', CONFIG.userAdminPermission, {permissionId: permissionId},
                            function (res) {
                                console.log('Delete done!');
                                getAllUsersInfo();
                            },
                            function () {
                                if (pO) {
                                    pO[0].status = true;
                                }
                            }
                        );
                    },
                    addRole: function () {
                        var valid = myInfo.iAmSuper.roleAdding.valid;
                        var name  = myInfo.iAmSuper.roleAdding.name;
                        var role  = myInfo.iAmSuper.roleAdding.role;
                        if (valid) {
                            console.log('A new role will be added, detail info: ');
                            console.log('name = ' + name + ', role = ' + role);

                            httpTemplate('POST', CONFIG.userAdminRole,
                                {
                                    name: name,
                                    role: role
                                },
                                function (res) {
                                    console.log('Add done');
                                    getAllUsersInfo();
                                }
                            );
                        }
                    },
                    addPermission: function (roleId) {
                        var data  = myInfo.iAmSuper.roles[roleId].permissionAdding;
                        var valid = myInfo.iAmSuper.roles[roleId].permissionAdding.valid;
                        if (valid) {
                            console.log('A new permission will be added under roleId = ' + roleId + ', detail info: ');
                            console.log(data);

                            httpTemplate('POST', CONFIG.userAdminPermission,
                                {
                                    roleId: roleId,
                                    resource: data.res,
                                    resourceType: data.resType,
                                    op: data.op.selected,
                                    info: data.info
                                },
                                function (res) {
                                    console.log('Add done');
                                    getAllUsersInfo();
                                }
                            );
                        }
                    }
                }
            }
        };

        var allUsersInfo = {
            roles: [],
            users: [],
            gen: function (data) {
                var self = this;
                self.roles = data.roles;

                var usersTmp = [];
                data.users.forEach(function (user) {
                    var u = {
                        id: user.userId,
                        name: user.userName,
                        roles: []
                    };
                    self.roles.forEach(function (role) {
                        var match = false;
                        if (user.roles.findObjItemByKey('roleId', role.id)) {
                            match = true;
                        }
                        var r = {
                            id: role.id,
                            has: match,
                            needUp: true,
                            wn: (function () {
                                return $scope.$watch(
                                    function () {
                                        return r.has;
                                    },
                                    function (newValue, oldValue) {
                                        if (newValue !== oldValue && r.needUp) {
                                            console.log('changed: ' + u.id + ' - ' + r.id + ' (' + newValue + ')');
                                            if (newValue) {
                                                httpTemplate('POST', CONFIG.userAdmin,
                                                    {users: u.id,
                                                     roles: r.id},
                                                    function () {
                                                        getAllUsersInfo();
                                                    },
                                                    function () {
                                                        r.has    = oldValue;
                                                        r.needUp = false;
                                                    }
                                                );
                                            }
                                            else {
                                                httpTemplate('DELETE', CONFIG.userAdmin,
                                                    {userId: u.id,
                                                     roleId: r.id},
                                                    function () {
                                                        getAllUsersInfo();
                                                    },
                                                    function () {
                                                        r.has = oldValue;
                                                        r.needUp = false;
                                                    }
                                                );
                                            }
                                        }
                                        else {
                                            r.needUp = true;
                                        }
                                    }
                                );
                            })()
                        };
                        u.roles.push(r);
                    });

                    // always put current user info (got from myInfo) into the first one
                    if (u.id === myInfo.userId) {
                        usersTmp.unshift(u);
                    }
                    else {
                        usersTmp.push(u);
                    }
                });

                // clean watch if need
                self.users.forEach(function (u) {
                    u.roles.forEach(function (r) {
                        if (r.wn) {
                            r.wn();
                        }
                    });
                });

                // re-assign users
                self.users = usersTmp;
            }
        };

        // binding them into $scope
        $scope.myInfo = myInfo;
        $scope.allUsersInfo = allUsersInfo;

        //
        function getMyInfo() {
            return httpTemplate('GET', CONFIG.user, {}, function (res) {
                myInfo.getBasic(res.data);
            });
        }

        function getAllUsersInfo() {
            return httpTemplate('GET', CONFIG.userAdmin, {}, function (res) {
                allUsersInfo.gen(res.data);
                myInfo.getRoles(res.data);
                myInfo.iAmSuper.gen(res.data);
            });
        }

        getMyInfo().then(getAllUsersInfo);
    }
]);
