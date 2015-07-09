/**
 * Created by zhujiawei on 2015/3/24.
 */
(function(app) {
    app.value('CONFIG', {
        monitor: '../../../api/monitor',
        alarm: '../../../api/alarm',
        monitorType: '../../../api/monitorType',
        monitorNames: '../../../api/monitor/monitorNames',
        user: '../../../api/user',
        userAdmin: '../../../api/user/admin',
        userAdminRole: '../../../api/user/admin/role',
        userAdminPermission: '../../../api/user/admin/permission',
        entirety: '../../../api/entirety',
        alarmResolve: '../../../api/alarm/resolve',
        alarmBatchResolve: '../../../api/alarm/resolve/batch',
        alarmNotify: '../../../api/alarm/notify',
        alarmDetail: '../../../api/alarm/detail',
        channel: '../../../api/sysInfo/channel',
        pvclick: '../../../api/pvclick',
        srcInfo: '../../../api/pvclick/srcInfo',
        analysis: '../../../api/analysis',
        analysisCaeMonitor: '../../../api/analysis/caeInfo',
        beforeOnlinePvClick: '../../../api/pvclick/imagePlus',
        pvClickDayLevel: '../../../api/pvclick/dayLevel',
        pvClickDayLevelLineChart: '../../../api/pvclick/dayLevel/lineChart',
        enableMonitor: '../../../api/monitor/op'
    });
})(app);