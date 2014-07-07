Ext.define('Packt.controller.Login', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.MD5',
        'Packt.util.Alert',
        'Packt.view.MyViewport',
        'Packt.util.Util',
        'Packt.util.SessionMonitor'
    ],

    views: [
        'Login',
        'Header',
        'authentication.CapsLockTooltip'
    ],

    refs: [
        {
            ref: 'capslockTooltip',
            selector: 'capslocktooltip'
        }
    ],

    init: function(application) {
        this.control({
            "login form button#submit": {
                click: this.onButtonClickSubmit
            },
            "login form button#cancel": {
                click: this.onButtonClickCancel
            },
            "login form textfield": {
                specialkey: this.onTextfielSpecialKey
            },
            "login form textfield[name=password]": {
                keypress: this.onTextfielKeyPress
            },
            "appheader button#logout": {
                click: this.onButtonClickLogout
            }
        });

        Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    customPass: function(val, field) {
        return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(val);
    },
    // vtype Text property: The error text to display when the validation function returns false
    customPassText: 'Not a valid password.  Length must be at least 6 characters and maximum of 20Password must contain one digit, one letter lowercase, one letter uppercase, onse special symbol @#$% and between 6 and 20 characters.',
});

    },

    onButtonClickSubmit: function(button, e, options) {
        var formPanel = button.up('form'),
            login = button.up('login'),
            user = formPanel.down('textfield[name=user]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue();   

        if (formPanel.getForm().isValid()) {

            pass = Packt.util.MD5.encode(pass); 
            
            Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');

            Ext.Ajax.request({
                url: 'php/login.php',
                params: {
                    user: user,
                    password: pass
                },
                success: function(conn, response, options, eOpts) {
                    
                    Ext.get(login.getEl()).unmask();

                    var result = Packt.util.Util.decodeJSON(conn.responseText);

                    if (result.success) {

                        //Packt.util.Alert.msg('Success!', 'User Authenticated.');
                        
                        login.close();
                        Ext.create('Packt.view.MyViewport');
                        Packt.util.SessionMonitor.start();

                    } else {
                        Packt.util.Util.showErrorMsg(conn.responseText);
                    }
                },
                failure: function(conn, response, options, eOpts) {

                    Ext.get(login.getEl()).unmask();
                
                    Packt.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }    
    },    

    onButtonClickCancel: function(button, e, options) {
        button.up('form').getForm().reset();
    },

    onTextfielSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER){
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onTextfielKeyPress: function(field, e, options) {
        var charCode = e.getCharCode(); 
        
        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){

            if(this.getCapslockTooltip() === undefined){
                Ext.widget('capslocktooltip');
            }

            this.getCapslockTooltip().show();

        } else {

            if(this.getCapslockTooltip() !== undefined){
                this.getCapslockTooltip().hide();
            }
        }
    },
    
    onButtonClickLogout: function(button, e, options) {

        Ext.Ajax.request({
            url: 'http://localhost/masteringextjs/php/logout.php',
            success: function(conn, response, options, eOpts){

                var result = Packt.util.Util.decodeJSON(conn.responseText);

                if (result.success) {
                    
                    button.up('mainviewport').destroy();
                    window.location.reload();
                } else {

                    Pack.util.Util.showErrorMsg(result.msg); 
                }
            },
            failure: function(conn, response, options, eOpts) {
                
                Packt.util.Util.showErrorMsg(conn.responseText);
            }
        });
    }
});
