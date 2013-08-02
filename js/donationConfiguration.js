function smartDonationConfigurationBase(title,containerName,options)
{
    this.title=title;
    this.containerName=containerName;

    if(options.isNew == false && typeof options.styles!='undefined')
        this.styles=options.styles;
    else
        this.styles=null;

    if(options.isNew)
        this.FillOptionsForNewDonation(options);
    this.InitiateGenerator(options);
    this.styles=this.generator.styles;

}





smartDonationConfigurationBase.prototype.InitiateGenerator=function()
{

}

smartDonationConfigurationBase.prototype.fillConfiguration=function()
{
    rnJQuery('#smartDonationsItemTitle').text(this.title);
    rnJQuery('#smartDonationsConfigurationFields').html(this.GetDonationConfigurationGeneratedCode());

    var self=this;
    rnJQuery('.smartDonationsSettingField').click(function(){self.SettingChanged(self,this)});
    rnJQuery('.smartDonationsSettingField').keyup(function(){self.SettingChanged(self,this)});
    rnJQuery('.smartDonationsSettingField').change(function(){self.SettingChanged(self,this)});
    rnJQuery('#smartDonationsEmail').keyup(function(){self.SettingChanged(self,this)});
    rnJQuery('#smartDonationsCurrencyDropDown').change(function(){self.SettingChanged(self,this)});

    rnJQuery('.smartDonationsSettingField').change();

};

smartDonationConfigurationBase.prototype.SettingChanged=function(configuration,component){

    var changedFieldName=rnJQuery(component).first().attr("name");
    var newValue;
    if(rnJQuery(component).is(':checkbox'))
        newValue=rnJQuery(component).is(':checked');
    else
        newValue=rnJQuery(component).val();
    configuration.generator[changedFieldName]=newValue;
    configuration.generator.GenerateDonationItem();

    this.PropertyChanged(changedFieldName,newValue);


};

smartDonationConfigurationBase.prototype.PropertyChanged=function(field,value){

}

smartDonationConfigurationBase.prototype.FillOptionsForNewDonation=function(options)
{

}



/*************************************************************************************Classic Generator  ***************************************************************************************************/



function smartDonationClassicConfiguration(containerName,options)
{
    smartDonationConfigurationBase.call(this,'Classic',containerName,options);
}

smartDonationClassicConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationClassicConfiguration.prototype.FillOptionsForNewDonation=function(options)
{
    options.smartDonationsdisplaycreditlogo=false;

}


smartDonationConfigurationBase.prototype.PropertyChanged=function(field,value){
    if(field=="smartDonationsdisplaycreditlogo")
        if(value)
            this.styles.smartDonationsDonationButton_src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif";
        else
            this.styles.smartDonationsDonationButton_src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
}


smartDonationClassicConfiguration.prototype.InitiateGenerator=function(options)
{
    this.generator=new smartDonationsClassicDonationGenerator(this.containerName,options,null,this.styles);

}

smartDonationClassicConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "<table> "+
        "<tr>    "+
        "<td>Display credit card logos</td> "+
        "<td><input name='smartDonationsdisplaycreditlogo' class='smartDonationsSettingField' type='checkbox' /> </td> "+
        "</tr>"+
        "</table>";

};



/************************************************************************************* Text Box  ***************************************************************************************************/



function smartDonationTextBoxConfiguration(containerName,options)
{
    smartDonationConfigurationBase.call(this,'Text Box',containerName,options);
}
smartDonationTextBoxConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);


smartDonationTextBoxConfiguration.prototype.FillOptionsForNewDonation=function(options)
{
    options.smartDonationsComment="If you like this plugin, please donate";
    options.smartDonationsRecommendedDonation=15;
    options.smartDonationsStyle=2;

}



smartDonationTextBoxConfiguration.prototype.InitiateGenerator=function(options)
{
    this.generator=new smartDonationsTextBoxDonationGenerator(this.containerName,options,null,this.styles);
}





smartDonationTextBoxConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "<table> "+
        "<tr>    "+
        "<td>Comment</td> "+
        "<td><input name='smartDonationsComment' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='If you like this plugin, please donate' /> </td> "+
        "</tr>"+
        "<td>Recommended Donation</td> "+
        "<td><input name='smartDonationsRecommendedDonation' class='smartDonationsSettingField smartDonationsNumericField' type='text' value='15' /> </td> "+
        "</tr>"+
        "<tr>    "+
        "<tr>    "+
        "<td>Style</td> "+
        "<td><select name='smartDonationsStyle' class='smartDonationsSettingField' ><option value='1'>One Line</option> <option selected='sel' value='2'>Two Lines</option><option value='3' >Three Lines</option></select></td> "+
        "</tr>"+
        "</table>";

};


/*************************************************************************************Three Buttons  ***************************************************************************************************/



function smartDonationsThreeButtonsConfiguration(containerName,options)
{
    smartDonationConfigurationBase.call(this,'Three Buttons',containerName,options);
}
smartDonationsThreeButtonsConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationsThreeButtonsConfiguration.prototype.FillOptionsForNewDonation=function(options)
{
    options.smartDonationButtonStyle1="threeButtonsStyle1.png";
    options.smartDonationButtonText1="Thank you ($5)";
    options.smartdonationsDonationquantity1=5;

    options.smartDonationButtonStyle2="threeButtonsStyle1.png";
    options.smartDonationButtonText2="Wow, Thanks!($15)";
    options.smartdonationsDonationquantity2=15;

    options.smartDonationButtonStyle3="threeButtonsStyle1.png";
    options.smartDonationButtonText3="You... Just Rock($25)";
    options.smartdonationsDonationquantity3=15;

    options.smartDonationSameSize=true;
}

smartDonationsThreeButtonsConfiguration.prototype.InitiateGenerator=function(options)
{
    this.generator=new smartDonationsThreeButtonsDonationGenerator(this.containerName,options,null,this.styles);
}


smartDonationsThreeButtonsConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "" +
        "<table style='margin-left: -10px;' > "+
            "<tr>" +
               "<td><span>Make Same Size</span></td>"+
                "<td><input type='checkbox' name='smartDonationSameSize' class='smartDonationsSettingField' checked='true'/></td>" +
            "</tr>"+
            "<tr style='height:50px'>    "+
                "<td> <span><strong>Button 1</strong></span> </td>"+
                "<td>" +
                "       <table>" +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>" +
                "                   <span>Style</span> <select name='smartDonationButtonStyle1' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
                "               </td>" +
                "           </tr> " +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>"+
                "                   <span >Text</span>  <input name='smartDonationButtonText1' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='Thank you (&#36;5)' />  " +
                "               </td>" +
                "           </tr>" +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>" +
                "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity1' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='5' />" +
                "               </td>" +
                "           </tr>" +
                "       </table> " +
                "</td> "+
            "</tr>" +
        "<tr style='height:15px'></tr>"+
        "<tr style='height:50px'>    "+
        "<td> <span><strong>Button 2</strong></span> </td>"+
        "<td>" +
        "       <table>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Style</span> <select name='smartDonationButtonStyle2' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
        "               </td>" +
        "           </tr> " +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>"+
        "                   <span >Text</span>  <input name='smartDonationButtonText2' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='Wow, Thanks!(&#36;15)' />  " +
        "               </td>" +
        "           </tr>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity2' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='15' />" +
        "               </td>" +
        "           </tr>" +
        "       </table> " +
        "</td> "+
        "</tr>" +
        "<tr style='height:15px'></tr>"+
        "<tr style='height:50px'>    "+
        "<td> <span><strong>Button 3</strong></span> </td>"+
        "<td>" +
        "       <table>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Style</span> <select name='smartDonationButtonStyle3' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
        "               </td>" +
        "           </tr> " +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>"+
        "                   <span >Text</span>  <input name='smartDonationButtonText3' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='You... Just Rock(&#36;25)' />  " +
        "               </td>" +
        "           </tr>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity3' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='25' />" +
        "               </td>" +
        "           </tr>" +
        "       </table> " +
        "</td> "+
        "</tr>"+
        "</table>";

};


/************************************************************************************* Slider ***************************************************************************************************/



function smartDonationsSliderConfiguration(containerName,options)
{
    smartDonationConfigurationBase.call(this,'Slider',containerName,options);
}
smartDonationsSliderConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationsSliderConfiguration.prototype.FillOptionsForNewDonation=function(options)
{
    options.smartDonationText="If you like it, please donate.";
    options.smartDonationsMinValue=5;
    options.smartDonationsMaxValue=50;
    options.smartDonationsDefaultValue=25;
    options.smartDonationIncrementOf=1
    options.currentValue=25;
}

smartDonationsSliderConfiguration.prototype.InitiateGenerator=function(options)
{
    this.generator=new smartDonationsSliderDonationGenerator(this.containerName,options,null,this.styles);
}

smartDonationsSliderConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "" +
        "<table style='margin-left: -10px;' > "+
        "<tr>" +
        "<td><span>Text</span></td>"+
        "<td><input type='text' name='smartDonationText' class='smartDonationsSettingField smartDonationsCommentField' value='If you like it, please donate.'/></td>" +
        "</tr>"+
        "<tr style='height:15px'></tr><tr>" +
        "<td><span>Minimun Value</span></td>"+
        "<td><input type='text' name='smartDonationsMinValue' class='smartDonationsSettingField smartDonationsNumericField' value='5'/></td>" +
        "</tr>"+
        "<tr>" +
        "<td><span>Maximun Value</span></td>"+
        "<td><input type='text' name='smartDonationsMaxValue' class='smartDonationsSettingField smartDonationsNumericField' value='50'/></td>" +
        "</tr>"+
        "<tr>" +
        "<td><span>Default Value</span></td>"+
        "<td><input type='text' name='smartDonationsDefaultValue' class='smartDonationsSettingField smartDonationsNumericField' value='25'/></td>" +
        "</tr><tr style='height:15px'></tr>"+
        "<td><span>Increments Of</span></td>"+
        "<td><input type='text' name='smartDonationIncrementOf' class='smartDonationsSettingField smartDonationsNumericField' value='1'/></td>" +
        "</tr>"+
        "</tr><tr style='height:15px'></tr>"+
        "<td><span >Allowed Values</span></td>"+
        "<td><input type='text' name='smartDonationAllowedValues' class='smartDonationsSettingField smartDonationsNumericField' value=''/><span class='description'>*Example 10,20,30,40</span></td>" +
        "</tr>"+
        "</table>";

};