Ext.namespace('Ext.ux');

<<<<<<< HEAD
Ext.ux.Keypad = function(config) {
	config = config || {};

	config.xtype = 'keypad';
	config.draggable = false;
	config.scroll = false;
	config.ui = config.ui || 'normal';

	var width = 500;
	var height = 650;
	var button_ui = 'action';
	var key_style = 'font-size:27pt;margin:5px;';
	if (config.ui == 'small'){
		width = 300;
		height = 350;
		button_ui = 'confirm-small';
		key_style = 'font-size:20pt;margin:5px;';
	}

	this.createDigitKey = function(digit) {
		return {
			xtype: 'button',
			text: digit,
			handler: function(){
				this.addDigit(digit);
			}, scope: this
		}
	};

	this.keypad_display = new Ext.form.Text({
		id: 'keypad_value',
		disabled: true,
		value: ''
	});

	this.submit_button = new Ext.Button({
		text: config.submitText || 'Submit',
		ui: button_ui,
		handler: function(b, e) {
			if (config.submitUrl) {
				var params = {};
				params[config.submitParamName || 'value'] = this.getValue();

				Ext.Ajax.request({
					url: config.submitUrl,
					params: params,
					success: function(response, opts){
						var data = Ext.util.JSON.decode(response.responseText);
						if (data.success && data.redirect_url) {
							window.location.href = data.redirect_url;
						} else {
							alert(data.msg);
						}
					},
					failure: function(response, opts){
						var data = Ext.util.JSON.decode(response.responseText);
						var message = data.msg || 'There was an error submitting the input.';

						Ext.ux.MessageBox.alert('Error',message);
					},
					scope: this
				});
			} else if (config.submitHandler) {
				config.submitHandler(this.getValue(), this, b, e);
			} else {
				Ext.Msg.alert('No submission action specified','value: ' + this.getValue());
			}
		},
		scope: this
	});

	this.title_bar = {};
	if (config.title){
		this.title_bar = {
			dock: 'top',
			xtype: 'toolbar',
			title: config.title
		};
	}

	this.keypad_panel = new Ext.Panel({
		title: 'Panel',
		id: 'keypad_panel',
		width:width,
		height:height,
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'stretch'
		},
		defaults: {
			layout: 'hbox',
			align: 'stretch',
			flex:1,
			defaults: {
				style:key_style,
				flex:1
			}
		},
		dockedItems: [this.title_bar],
		items: [{
			items: [this.keypad_display]
		},{
			items: [this.createDigitKey('1'), this.createDigitKey('2'), this.createDigitKey('3')]
		}, {
			items: [this.createDigitKey('4'), this.createDigitKey('5'), this.createDigitKey('6')]
		}, {
			items: [this.createDigitKey('7'), this.createDigitKey('8'), this.createDigitKey('9')]
		}, {
			items: [{},this.createDigitKey('0'),{},]
		}, {
			items: [{
				xtype: 'button',
				ui: button_ui,
				text: config.clearText || 'Clear',
				handler: function(){
					this.clear()
				},scope:this
			}, 
				this.submit_button
			]
		}]
	});

	if (config.centered){
		config.layout = {type:'hbox', pack:'center'};
	}
	config.height = height;

	Ext.apply(this, config);
=======
Ext.define('Ext.ux.Keypad', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Panel',
        'Ext.MessageBox',
        'Ext.field.Text',
        'Ext.Ajax',
        'Ext.util.JSON'
    ],
    alias: 'widget.keypad',

    config: {
        draggable: false,
        scroll: false,
        ui: 'normal',
        centered: false,
        clearText: 'Clear',
        submitText: 'Submit',
        submitUrl: '',
        submitParamName: 'value',
        submitHandler: null
    },

    constructor: function(config) {
        config = config || {};

        if (config.centered){
            config.layout = {type:'hbox', pack:'center'};
        }
        this.callParent([config]);

        var width = 500;
        var height = 650;
        var button_ui = 'action';
        var key_style = 'font-size:27pt;margin:5px;';
        if (this.getUi() == 'small'){
            width = 300;
            height = 350;
            button_ui = 'confirm-small';
            key_style = 'font-size:20pt;margin:5px;';
        }

        this.keypadDisplay = Ext.create('Ext.field.Text', {
            disabled: true,
            value: ''
        });

        this.clearButton = Ext.create('Ext.Button', {
            ui: button_ui,
            text: this.getClearText(),
            handler: function(){
                this.clear()
            },
            scope: this
        });

        this.submitButton = Ext.create('Ext.Button', {
            text: this.getSubmitText(),
            ui: button_ui,
            handler: function(b, e) {
                if (this.getSubmitUrl()) {
                    var params = {};
                    params[this.getSubmitParamName()] = this.getValue();

                    Ext.Ajax.request({
                        url: this.getSubmitUrl(),
                        params: params,
                        success: function(response, opts){
                            var data = Ext.util.JSON.decode(response.responseText);
                            if (data.success && data.redirect_url) {
                                window.location.href = data.redirect_url;
                            } else {
                                var message = data.msg || 'There was an error submitting the input.';

                                //Ext.Msg.alert('Error', message);
                                alert(message);
                            }
                        },
                        failure: function(response, opts){
                            var data = Ext.util.JSON.decode(response.responseText);
                            var message = data.msg || 'There was an error submitting the input.';

                            //Ext.Msg.alert('Error', message);
                            alert(message);
                        },
                        scope: this
                    });
                } else if (this.getSubmitHandler()) {
                    this.getSubmitHandler()(this.getValue(), this, b, e);
                } else {
                    //Ext.Msg.alert('No submission action specified', 'Value: ' + this.getValue());
                    alert('Value: ' + this.getValue());
                }
            },
            scope: this
        });

        this.createDigitKey = function(digit) {
            return {
                xtype: 'button',
                text: digit,
                handler: function(){
                    this.addDigit(digit);
                }, scope: this
            }
        };


        this.keypadPanel = Ext.create('Ext.Panel', {
            width: width,
            height: height,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            defaults: {
                layout: 'hbox',
                align: 'stretch',
                flex: 1,
                defaults: {
                    style: key_style,
                    flex: 1
                }
            },
            items: [{
                items: [this.keypadDisplay]
            },{
                items: [this.createDigitKey('1'), this.createDigitKey('2'), this.createDigitKey('3')]
            }, {
                items: [this.createDigitKey('4'), this.createDigitKey('5'), this.createDigitKey('6')]
            }, {
                items: [this.createDigitKey('7'), this.createDigitKey('8'), this.createDigitKey('9')]
            }, {
                items: [{},this.createDigitKey('0'),{}]
            }, {
                items: [
                    this.clearButton, 
                    this.submitButton
                ]
            }]
        });

        this.add(this.keypadPanel);
    },
>>>>>>> master

	addDigit: function(digit) {
		this.setValue(this.getValue() + digit);
	},

	clear: function() {
		this.keypadDisplay.setValue('');
	},

	setValue: function(value) {
		this.keypadDisplay.setValue(value);
	},

	getValue: function() {
		return this.keypadDisplay.getValue();
	}
});
