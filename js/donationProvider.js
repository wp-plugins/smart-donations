
//<editor-fold desc="Base Donaiton Provider">
function smartDonationsBaseDonationProvider(){

}

smartDonationsBaseDonationProvider.prototype.GetStartOfDonationForm=function(){};
smartDonationsBaseDonationProvider.prototype.GetEndOfDonationForm=function(){};
//</editor-fold>




//<editor-fold desc="PayPal">
function smartDonationsPayPalProvider(){
    smartDonationsBaseDonationProvider.call(this);

}

smartDonationsPayPalProvider.prototype=Object.create(smartDonationsBaseDonationProvider.prototype);

smartDonationsPayPalProvider.prototype.GetStartOfDonationForm=function(generator,defaultQuantity)
{
    var payPalUrl='';
    if(smartDonationsSandbox=='y')
        payPalUrl='https://www.sandbox.paypal.com/cgi-bin/webscr';
    else
        payPalUrl='https://www.paypal.com/cgi-bin/webscr';

    var itemName="Donation"
    if(typeof generator.donation_description!='undefined')
        itemName=generator.donation_description;

    var donationText= '<div class="smartDonationsDonationGeneratedItem"  >\
                <form action="'+payPalUrl+'" method="post" class="donationForm" target="_blank">      \
                <input type="hidden" name="cmd" class="smartDonationsPaypalCommand" value="_donations">\
                <input type="hidden" name="item_name" value="'+itemName+'">\
                <input type="hidden" name="business" value="'+generator.business+'">\
                <input type="hidden" name="lc" value="'+generator.selectedCountry+'">                       \
                <input type="hidden" name="no_note" value="0">                    \
                <input type="hidden" name="currency_code" value="'+generator.donation_currency+'">             \
                <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">\
                <input type="hidden" name="custom" value="'+generator.campaign_id+'">';

    if(typeof smartDonationsRootPath != 'undefined')
        donationText+='<input type="hidden" name="notify_url" value="'+smartDonationsRootPath+'ipn/rednao_paypal_ipn.php">';

    if(generator.returningUrl)
        donationText+='<input type="hidden" name="return" value="'+generator.returningUrl+'">';

    var quantity=-1;

    try{
        quantity=parseFloat(defaultQuantity);
    }catch(exception)
    {

    }

    if(!isNaN(quantity))
        donationText+='<input type="hidden" name="amount" class="amountToDonate" value="'+defaultQuantity+'">';

    return donationText;


};



smartDonationsPayPalProvider.prototype.GetEndOfDonationForm=function()
{
    return '</form>\
             </div>';
};
//</editor-fold>





//<editor-fold desc="WePay">------------------------------------------------------------------------------------------------------------------------------------------------------
function smartDonationsWePayProvider(hide){
    smartDonationsBaseDonationProvider.call(this);
    this.hide=hide;
    this.ButtonText="";
    this.FixedAmount=true;
}


smartDonationsWePayProvider.prototype=Object.create(smartDonationsBaseDonationProvider.prototype);




smartDonationsWePayProvider.prototype.GetStartOfDonationForm=function(generator,defaultQuantity)
{
    var auxBusiness="0";
    try{
        auxBusiness=parseInt(generator.business).toString();
    }catch(exception)
    {

    }


    this.anchor=Math.random();
    if(this.FixedAmount)
        return  '<a class="wepay-widget-button wepay-green smartDonationsWePayButton smartDonationsEditableItem smartDonationsDonationButton_wp" '+(this.hide?' style="display:none;" ':'')+' id="wepay_widget_anchor_'+this.anchor+'" href="https://www.wepay.com/donations/'+auxBusiness+'">'+this.ButtonText+'</a><script type="text/javascript">var WePay = WePay || {};WePay.load_widgets = WePay.load_widgets || function() { };WePay.widgets = WePay.widgets || [];WePay.widgets.push( {object_id: '+auxBusiness+',widget_type: "donation_campaign",anchor_id: "wepay_widget_anchor_'+this.anchor+'",widget_options: {donation_amount: '+defaultQuantity*100+',allow_cover_fee: true,enable_recurring: true,allow_anonymous: true,button_text: "casa $10.00"}});if (!WePay.script) {WePay.script = document.createElement(\'script\');WePay.script.type = \'text/javascript\';WePay.script.async = true;WePay.script.src = \'https://static.wepay.com/min/js/widgets.v2.js\';var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(WePay.script, s);} else if (WePay.load_widgets) {WePay.load_widgets()}</script>'
    else
        return '<a class="wepay-widget-button wepay-green smartDonationsWePayButton smartDonationsEditableItem smartDonationsDonationButton_wp" '+(this.hide?' style="display:none;" ':'')+' id="wepay_widget_anchor_'+this.anchor+'" href="https://www.wepay.com/donations/'+auxBusiness+'">'+this.ButtonText+'</a><script type="text/javascript">var WePay = WePay || {};WePay.load_widgets = WePay.load_widgets || function() { };WePay.widgets = WePay.widgets || [];WePay.widgets.push( {object_id: '+auxBusiness+',widget_type: "donation_campaign",anchor_id: "wepay_widget_anchor_'+this.anchor+'",widget_options: {donator_chooses: true,allow_cover_fee: true,enable_recurring: true,allow_anonymous: true,button_text: "casa $10.00"}});if (!WePay.script) {WePay.script = document.createElement(\'script\');WePay.script.type = \'text/javascript\';WePay.script.async = true;WePay.script.src = \'https://static.wepay.com/min/js/widgets.v2.js\';var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(WePay.script, s);} else if (WePay.load_widgets) {WePay.load_widgets();}</script>'


};


smartDonationsWePayProvider.prototype.GetEndOfDonationForm=function()
{
    return '';
};

smartDonationsWePayProvider.prototype.ChangeDonationAmount=function(generator,value)
{
    try{
        var componentId="wepay_widget_anchor_"+this.anchor;
        WePay.get_widget_by_anchor_id(componentId).widget_options.donation_amount=value*100;
    }catch(exception)
    {
        return;
    }

}


//</editor-fold>




