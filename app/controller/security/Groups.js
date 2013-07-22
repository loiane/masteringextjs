Ext.define('Packt.controller.security.Groups', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.Util'
    ],

    views: [
        'security.Groups',
        'security.GroupsList',
        'security.GroupsEdit',
        'security.GroupPermissions'
    ],

    stores: [
        'security.Groups'
    ],

    refs: [
        {
            ref: 'groupsEdit',
            selector: 'groupsedit'
        },
        {
            ref: 'groupPermissions',
            selector: 'grouppermissions'
        },
        {
            ref: 'groupsList',
            selector: 'groupslist'
        }
    ],

    init: function(application) {

        this.control({
            "groupslist": {
                viewready: this.onViewReady,
                selectionchange: this.onSelectionChange
            },
            "groupslist button#add": {
                click: this.onButtonClickAdd
            },
            "groupslist button#delete": {
                click: this.onButtonClickDelete
            },
            "grouppermissions": {
                checkchange: this.onCheckChange,
                load: this.onTreeLoad
            },
            "groupsedit button#save": {
                click: this.onButtonClickSave
            },
            "groupsedit button#cancel": {
                click: this.onButtonClickCancel
            }
        });
    },

    onViewReady: function(component, options) {

    	component.getStore().load(function(records, operation, success) {
    		
    		if (records.length > 0){
    			component.getSelectionModel().select(0);
    		}
    	});
    },

    onSelectionChange: function (sm, records, options) {

    	if (records[0]) {
            this.getGroupsEdit().getForm().loadRecord(records[0]);

            this.getGroupPermissions().getStore().load({
            	params: {
            		group: records[0].get('id')
            	}
            });

            this.getGroupsEdit().down('userslist').getStore().load({
                params: {
                    group: records[0].get('id')
                }
            });

            this.getGroupsEdit().setDisabled(false);
        }
    },

    onCheckChange: function (node, checked, options) {

        if (node.isLeaf() && checked) {
            node.parentNode.set('checked', checked);
        } else if (!node.isLeaf()) {
            node.cascadeBy(function(n){
                n.set('checked', checked);
            });
        }
    },

    onTreeLoad: function (component, node, records, successful, options) {

        node.cascadeBy(function(n){
            n.set('text', translations[n.get('text')]);
        });
    },

    onButtonClickAdd: function (button, e, options) {

    	var model = Ext.create('Packt.model.security.Group', {
    		id: 0,
    		name: null
    	});

    	this.getGroupsEdit().getForm().loadRecord(model);

    	this.getGroupPermissions().getStore().load();

        this.getGroupsEdit().down('userslist').getStore().removeAll();

        this.getGroupsEdit().setDisabled(false);
    },

    onButtonClickDelete: function (button, e, options) {

    	var grid = button.up('groupslist'),
        tree = this.getGroupPermissions(),
        formPanel = this.getGroupsEdit(),
        form = this.getGroupsEdit().getForm(),
        usersGrid = formPanel.down('userslist'),
    	record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0] && usersGrid.getStore().getCount() == 0){

        	Ext.Msg.show({
			     title:'Delete?',
			     msg: 'Are you sure you want to delete?',
			     buttons: Ext.Msg.YESNO,
			     icon: Ext.Msg.QUESTION,
			     fn: function (buttonId){
			     	if (buttonId == 'yes'){
			     		Ext.Ajax.request({
                            url: 'php/security/deleteGroup.php',
                            params: {
                                id: record[0].get('id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = Packt.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {

                                    Packt.util.Alert.msg('Success!', 'Group deleted.');
                                    store.load();
                                    form.reset();
                                    formPanel.setDisabled(true);
                                    usersGrid.getStore().removeAll();
                                    tree.getStore().load();
                                  
                                } else {
                                    Packt.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {

                                Packt.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
			     	}
			     }
			});
        } else if (store.getCount() == 1) {
        	Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the groups from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        } else if (usersGrid.getStore().getCount() > 0){
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete groups that have users in it.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    resetForm: function(){

        var form = this.getGroupsEdit();

        this.getGroupPermissions().getStore().load();

        form.down('userslist').getStore().removeAll();

        form.disable();

        form.getForm().reset();
    },

    onButtonClickCancel: function(button, e, options) {
        this.resetForm();
    },

    onButtonClickSave: function (button, e, options) {

        var store = this.getGroupsList().getStore(),
        formPanel = button.up('form'),
        records = formPanel.down('treepanel').getView().getChecked(),
        names = [];
        
        Ext.Array.each(records, function(rec){
            names.push(rec.get('id'));
        });

        if (formPanel.getForm().isValid()){
        	if (names.length == 0){
	        	Ext.Msg.show({
				    title:'Warning',
				    msg: 'You need to select a least one permission for this group.',
				    buttons: Ext.Msg.OK,
				    icon: Ext.Msg.WARNING
				});
	        } else {

	        	var values = formPanel.getValues();

                Ext.get(formPanel.getEl()).mask("Saving... Please wait...", 'loading');

	        	Ext.Ajax.request({
	                url: 'php/security/saveGroup.php',
	                params: {
	                    id: values.id,
	                    name: values.name,
	                    permissions: names.toString()
	                },
	                success: function(conn, response, options, eOpts) {
	                    
	                    Ext.get(formPanel.getEl()).unmask();

	                    var result = Packt.util.Util.decodeJSON(conn.responseText);

	                    if (result.success) {

	                        Packt.util.Alert.msg('Success!', 'Group saved.');
                            store.load();
                            formPanel.setDisabled(true);
	                      
	                    } else {
	                        Packt.util.Util.showErrorMsg(conn.responseText);
	                    }
	                },
	                failure: function(conn, response, options, eOpts) {

	                    Ext.get(formPanel.getEl()).unmask();
	                
	                    Packt.util.Util.showErrorMsg(conn.responseText);
	                }
	            });
	        }
        }
    }
});