rnJQuery(function()
{
    if( window.smartDonationsItemsToLoad)
        for(var i=0;i< window.smartDonationsItemsToLoad.length;i++)
            smartDonationsLoadDonation(window.smartDonationsItemsToLoad[i].options,window.smartDonationsItemsToLoad[i].element);
    else
        SmartDonationsInitialize();
});

/***Base Object*******/
function smartDonationsLoadDonation(options,containerName)
{
    var donationTypeSelected= options.smartDonationsType;
    options.isNew=false;
    if(!options.donation_provider)
        options.donation_provider='paypal';

    var aux;


    if(typeof options.styles =='undefined'||options.styles!=null)
        this.styles=options.styles;

    if(options.donation_provider=='paypal')
    {
        if(donationTypeSelected=='classic')
            aux=new smartDonationsClassicDonationGenerator(containerName,options,null,styles);
        else
        if(donationTypeSelected=='textbox')
            aux=new smartDonationsTextBoxDonationGenerator(containerName,options,null,styles);
        else
        if(donationTypeSelected=="threeButtons")
            aux=new smartDonationsThreeButtonsDonationGenerator(containerName,options,null,styles);
        else
        if(donationTypeSelected=="slider")
            aux=new smartDonationsSliderDonationGenerator(containerName,options,null,styles);
        else
            throw 'Undefined donation type';
    }else
    if(options.donation_provider=='wepay')
    {
        if(donationTypeSelected=='classic')
            aux=new smartDonationsClassicDonationGenerator_wepay(containerName,options,styles);
        else if(donationTypeSelected=='textbox')
            aux=new smartDonationsTextBoxDonationGenerator_wepay(containerName,options,styles);
        else if(donationTypeSelected=="threeButtons")
            aux=new smartDonationsThreeButtonsDonationGenerator_wepay(containerName,options,styles);
        else if(donationTypeSelected=="slider")
            aux=new smartDonationsSliderDonationGenerator_wepay(containerName,options,styles);
        else
            throw 'Undefined donation type';
    }else
        throw 'Undefined provider';


    aux.GenerateDonationItem();
    return aux;


}




function smartDonationsBaseGenerator(containerName2,options,donationProvider,styles){
    if(donationProvider)
        this.donationProvider=donationProvider;
    else
        this.donationProvider=new smartDonationsPayPalProvider();

    if(styles!=null)
        this.styles=styles;
    else
    {
        this.styles={};
        this.GenerateDefaultStyle();
    }
    this.containerName=containerName2;

    this.business=options.business;
    this.returningUrl=options.returningUrl;
    this.donation_currency=SmartdonationsGetValueOrDefault(options.donation_currency,'USD');

}

function SmartdonationsGetValueOrDefault(value,defaultValue)
{
    if(typeof value=='undefined')
        return defaultValue;
    return value;

}

smartDonationsBaseGenerator.prototype.GenerateDefaultStyle=function()
{
    return {};
}

smartDonationsBaseGenerator.prototype.GetRootContainer=function()
{
    return rnJQuery('#'+this.containerName);
}

smartDonationsBaseGenerator.prototype.DonationGeneratedCode=function(){};

smartDonationsBaseGenerator.prototype.GenerateDonationItem=function()
{
    var generator=this;
    this.GetRootContainer().html('').append(this.DonationGeneratedCode());
    this.GetRootContainer().find(".donationForm").submit(function(){generator.SubmitFired(generator)});
    this.GenerationCompleted();
    this.StyleItem();
}

smartDonationsBaseGenerator.prototype.StyleItem=function()
{
    if(this.styles==null)
        return;

    for(var property in this.styles)
    {
        this.GetRootContainer().find("."+property).attr("style",this.styles[property]);
    }
}

smartDonationsBaseGenerator.prototype.GenerationCompleted=function()
{

}

smartDonationsBaseGenerator.prototype.SubmitFired=function(generator)
{

}

smartDonationsBaseGenerator.prototype.GetStartOfDonationForm=function(defaultQuantity)
{
    return this.donationProvider.GetStartOfDonationForm(this, defaultQuantity);


};


smartDonationsBaseGenerator.prototype.ChangeAmountToDonate=function(amount)
{
    try
    {
        var amount=parseFloat(amount);
        this.GetRootContainer().find(".amountToDonate").val(amount);
    }catch(exception)
    {

    }
}


smartDonationsBaseGenerator.prototype.GetEndOfDonationForm=function()
{
    return this.donationProvider.GetEndOfDonationForm();
};




/************************************************************************************* Classic Generator ***************************************************************************************************/


function smartDonationsClassicDonationGenerator(containerName,options,donationProvider,styles){
    smartDonationsBaseGenerator.call(this,containerName,options,donationProvider,styles);

    this.smartDonationsdisplaycreditlogo=options.smartDonationsdisplaycreditlogo;

}

smartDonationsClassicDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

smartDonationsClassicDonationGenerator.prototype.GenerateDefaultStyle=function()
{
    this.styles.smartDonationsDonationButton_src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
}

smartDonationsClassicDonationGenerator.prototype.DonationGeneratedCode=function()
{
    var imageToUse;

    if(typeof this.styles=='undefined')
    {
        if(this.smartDonationsdisplaycreditlogo)
            imageToUse="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif";
        else
            imageToUse="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
    }else
        imageToUse=this.styles.smartDonationsDonationButton_src;


        return   this.GetStartOfDonationForm()+
                '<input type="image" class="smartDonationsDonationButton smartDonationsEditableItem" src="'+imageToUse+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'+this.GetEndOfDonationForm();



}






/************************************************************************************* Text Box  ***************************************************************************************************/



function smartDonationsTextBoxDonationGenerator(containerName,options,donationProvider,styles){
    smartDonationsBaseGenerator.call(this,containerName,options,donationProvider,styles);

    this.smartDonationsComment=options.smartDonationsComment;
    this.smartDonationsRecommendedDonation=options.smartDonationsRecommendedDonation;
    this.smartDonationsStyle=options.smartDonationsStyle;

}

smartDonationsTextBoxDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

smartDonationsTextBoxDonationGenerator.prototype.GenerateDefaultStyle=function()
{
    this.styles.smartDonationsCommentText="vertical-align:middle; margin-left:5px;font-family:verdana;";
    this.styles.smartDonationsDonationBox="vertical-align:middle; margin-left:5px;font-family:verdana;";
    this.styles.smartDonationsDonationButton="vertical-align:middle; margin-left:5px;";
    this.styles.smartDonationsDonationButton_src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
}

smartDonationsTextBoxDonationGenerator.prototype.GetCommentTag=function()
{
    return '<span class="smartDonationsTextBoxDonationField smartDonationsCommentText smartDonationsEditableItem">'+this.smartDonationsComment+'</span>';
}

smartDonationsTextBoxDonationGenerator.prototype.GetTextBoxTag=function()
{
    return '<input type="text" class="smartDonationsNumericField smartDonationsTextBoxDonationField smartDonationsDonationBox smartDonationsEditableItem"  value="'+this.smartDonationsRecommendedDonation+'">';
}

smartDonationsTextBoxDonationGenerator.prototype.GetButtonTag=function()
{
    var imageToUse;
    if(typeof this.styles=='undefined')
        imageToUse="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
    else
        imageToUse=this.styles.smartDonationsDonationButton_src;


    return  '<input type="image" class="smartDonationsDonationButton smartDonationsEditableItem" src="'+imageToUse+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">';

}


smartDonationsTextBoxDonationGenerator.prototype.SubmitFired=function(generator)
{
    generator.ChangeAmountToDonate(rnJQuery('#'+generator.containerName).find(".smartDonationsDonationBox").val());

}


smartDonationsTextBoxDonationGenerator.prototype.DonationGeneratedCode=function()
{
    if(this.smartDonationsStyle==1)
    {
        return  this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
            '<table class="smartDonationsTextBoxDonationContainer">\
                              <tr>\
                                  <td>'+
            this.GetCommentTag()+

            this.GetTextBoxTag()+

            this.GetButtonTag()+
            '</td>\
        </tr> \
  </table>'
            +this.GetEndOfDonationForm();
    }

    if(this.smartDonationsStyle==2)
    {
        return  this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
            '<table class="smartDonationsTextBoxDonationContainer">\
                              <tr>\
                                  <td>'+
            this.GetCommentTag()+
            '</td>\
         </tr>\
               <td>'+
            this.GetTextBoxTag()+
            this.GetButtonTag()+
            '</td>\
        </tr> \
  </table>'
            +this.GetEndOfDonationForm();
    }

    if(this.smartDonationsStyle==3)
    {
        return  this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
             '<table class="smartDonationsTextBoxDonationContainer">\
                               <tr>\
                                   <td>'+
                        this.GetCommentTag()+
                        '</td>\
                     </tr>\
                     <tr>\
                         <td>'+
                        this.GetTextBoxTag()+
                        '</td>\
                     </tr>\
                     <tr>  \
                         <td>'+
                        this.GetButtonTag()+
                        '</td>\
                    </tr> \
              </table>'
            +this.GetEndOfDonationForm();
    }


}




/************************************************************************************* Three Buttons  ***************************************************************************************************/



    function smartDonationsThreeButtonsDonationGenerator(containerName,options,donationProvider,styles){
        smartDonationsBaseGenerator.call(this,containerName,options,donationProvider,styles);



        this.smartDonationButtonStyle1=options.smartDonationButtonStyle1;
        this.smartDonationButtonText1=options.smartDonationButtonText1;
        this.smartdonationsDonationquantity1=options.smartdonationsDonationquantity1;

        this.smartDonationButtonStyle2=options.smartDonationButtonStyle2;
        this.smartDonationButtonText2=options.smartDonationButtonText2;
        this.smartdonationsDonationquantity2=options.smartdonationsDonationquantity2;

        this.smartDonationButtonStyle3=options.smartDonationButtonStyle3;
        this.smartDonationButtonText3=options.smartDonationButtonText3;
        this.smartdonationsDonationquantity3=options.smartdonationsDonationquantity3;

        this.smartDonationSameSize=options.smartDonationSameSize;


        if(typeof this.styles=='undefined')
            this.styles={};

        if(typeof this.styles.smartDonationsThreeButtonImage1_src=='undefined')
        {
            this.styles.smartDonationsThreeButtonImage1_src=smartDonationsRootPath+'images/'+this.smartDonationButtonStyle1;
            this.styles.smartDonationsThreeButtonImage2_src=smartDonationsRootPath+'images/'+this.smartDonationButtonStyle2;
            this.styles.smartDonationsThreeButtonImage3_src=smartDonationsRootPath+'images/'+this.smartDonationButtonStyle3;
        }



    }
    smartDonationsThreeButtonsDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);


    smartDonationsThreeButtonsDonationGenerator.prototype.GenerateDefaultStyle=function()
    {
        this.styles.smartDonationsThreeButtonImage1="cursor:pointer; cursor:hand;overflow:hidden;"
        this.styles.smartDonationsThreeButtonSpan1="position:relative;vertical-align:top;font-family:Verdana;cursor:pointer;cursor:hand;";
        // this.styles.smartDonationsThreeButtonImage1_src="threeButtonsStyle1.png";

        this.styles.smartDonationsThreeButtonImage2="cursor:pointer; cursor:hand;overflow:hidden;"
        this.styles.smartDonationsThreeButtonSpan2="position:relative;vertical-align:top;font-family:Verdana;cursor:pointer;cursor:hand;";
        //this.styles.smartDonationsThreeButtonImage2_src="threeButtonsStyle1.png";

        this.styles.smartDonationsThreeButtonImage3="cursor:pointer; cursor:hand;overflow:hidden;"
        this.styles.smartDonationsThreeButtonSpan3="position:relative;vertical-align:top;font-family:Verdana;cursor:pointer;cursor:hand;";
        //this.styles.smartDonationsThreeButtonImage3_src="threeButtonsStyle1.png";
    }

    smartDonationsThreeButtonsDonationGenerator.prototype.AdjustSize=function(image,span,generator)
    {
        var image = this.GetRootContainer().find(image);
        var text = this.GetRootContainer().find(span);

        this.ResizeImage(image, text,generator);
        this.CenterTextInImage(image, text);

    }


     smartDonationsThreeButtonsDonationGenerator.prototype.ResizeImage=function(image,text,generator) {

        var offsetWidth = 30;
        var offsetHeight = 10;

        var width = text.width();
        var height = text.height();

         if(this.smartDonationSameSize)
         {
             var spans=generator.GetRootContainer().find('.smartDonationsThreeButtonSpan1,.smartDonationsThreeButtonSpan2,.smartDonationsThreeButtonSpan3');
             for(var i=0;i<spans.length;i++)
             {
                 var spanToCheck=rnJQuery(spans[i]);

                 if(spanToCheck.width()>width)
                    width=spanToCheck.width();

                 if(spanToCheck.height()>height)
                    height=spanToCheck.height();
             }
         }

         width=width+offsetWidth;
         height=height+offsetHeight;

        image.width(width );
        image.height(height );

        var parent= rnJQuery(image).parent();
        parent.width(width);
        parent.height(height);

         parent=parent.parent();
        parent.css('display','inline-block');

    }

     smartDonationsThreeButtonsDonationGenerator.prototype.CenterTextInImage=function(image,text) {

        var top = image.offset().top - text.offset().top;
        var left = image.offset().left - text.offset().left;

        top += (image.height() / 2) - (text.height() / 2)-1;
        left += (image.width() / 2) - (text.width() / 2);

        text.css("top", top);
        text.css("left", left);
    }

    smartDonationsThreeButtonsDonationGenerator.prototype.AdjustButtonDimensions=function(text,button,textWidth,textHeight,buttonWidth,buttonHeight)
    {
        var offsetWidth=16;
        var offsetheight=10;

        buttonWidth+=offsetWidth;
        buttonHeight+=offsetheight;

        button.width(buttonWidth);
        button.height(buttonHeight);

        var top=(buttonHeight/2)-(textHeight/2);
        var left=(buttonWidth/2)-(textWidth/2);



        left-=buttonWidth;

        text.css('top',top);
        text.css('left',left);

    }





smartDonationsThreeButtonsDonationGenerator.prototype.DonationGeneratedCode=function()
{
    return '<div class="smartDonationsThreeButtonsDiv1 " >'+ this.GetStartOfDonationForm(this.smartdonationsDonationquantity1)+
        '<div class="smartdonationsThreeButtonStyle"> \
            <image class="smartDonationsThreeButtonImage1 smartDonationsThreeButton smartDonationsEditableItem" src="" />\
            <span class="smartDonationsThreeButtonSpan1 smartDonationsThreeButtonSpan smartDonationsEditableItem" >'+this.smartDonationButtonText1+'</span>\
             </div>'+this.GetEndOfDonationForm()+
        this.GetStartOfDonationForm(this.smartdonationsDonationquantity2)+
        '<div class="smartdonationsThreeButtonStyle smartDonationsThreeButtonMiddleDiv" > \
            <image class="smartDonationsThreeButtonImage2 smartDonationsThreeButton smartDonationsEditableItem" src=""/>\
            <span class="smartDonationsThreeButtonSpan2 smartDonationsThreeButtonSpan smartDonationsEditableItem" >'+this.smartDonationButtonText2+'</span>\
             </div>'+this.GetEndOfDonationForm()+
        this.GetStartOfDonationForm(this.smartdonationsDonationquantity3)+
        '<div class="smartdonationsThreeButtonStyle"> \
            <image class="smartDonationsThreeButtonImage3 smartDonationsThreeButton smartDonationsEditableItem" src="" />\
            <span class="smartDonationsThreeButtonSpan3 smartDonationsThreeButtonSpan smartDonationsEditableItem" >'+this.smartDonationButtonText3+'</span>\
             </div>'+this.GetEndOfDonationForm()+'</div>';


}


smartDonationsThreeButtonsDonationGenerator.prototype.GenerationCompleted=function()
{
    var generator=this;

    rnJQuery(function()
    {
        generator.GetRootContainer().find('.smartDonationsDonationGeneratedItem').css('display','inline-block');
    })

    rnJQuery(function(){
        generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage1','.smartDonationsThreeButtonSpan1',generator.styles.smartDonationsThreeButtonImage1_src);
        generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage2','.smartDonationsThreeButtonSpan2',generator.styles.smartDonationsThreeButtonImage2_src);
        generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage3','.smartDonationsThreeButtonSpan3',generator.styles.smartDonationsThreeButtonImage3_src);
    });


}

smartDonationsThreeButtonsDonationGenerator.prototype.CreateAndLayoutImage=function(image,span,imageName)
{
    var generator=this;
    generator.GetRootContainer().find(image).attr('src',imageName).load(function(){generator.AdjustSize(image,span,generator)});
    generator.GetRootContainer().find(image+','+span).click(function(){
        rnJQuery(this).parent().parent().submit();
    });
}






/************************************************************************************* Slider ***************************************************************************************************/




function smartDonationsSliderDonationGenerator(containerName,options,donationProvider,styles){
    smartDonationsBaseGenerator.call(this,containerName,options,donationProvider,styles);

    this.smartDonationText=options.smartDonationText;
    this.smartDonationsMinValue=options.smartDonationsMinValue;
    this.smartDonationsMaxValue=options.smartDonationsMaxValue;
    this.smartDonationsDefaultValue=options.smartDonationsDefaultValue;
    this.smartDonationIncrementOf=options.smartDonationIncrementOf;
    this.currentValue=options.smartDonationsDefau
    this.smartDonationAllowedValues=options.smartDonationAllowedValues;


}

smartDonationsSliderDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);


smartDonationsSliderDonationGenerator.prototype.GenerateDefaultStyle=function()
{
    this.styles.smartDonationsDonationButton_src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
}

smartDonationsBaseGenerator.prototype.StyleItem=function()
{
    if(this.styles==null)
        return;

    for(var property in this.styles)
    {
        var element=this.GetRootContainer().find("."+property);
        if(property=='ui-slider-range-min')
        {
            var previousWidth=0;
            previousWidth=element.css('width');
            element.attr("style",this.styles[property]);
            element.css('width',previousWidth);
        }else if(property=='ui-slider-handle')
        {
            var previousLeft=0;
            previousLeft=element.css('left');
            element.attr("style",this.styles[property]);
            element.css('left',previousLeft);
        }else
            element.attr("style",this.styles[property]);



    }
}

smartDonationsSliderDonationGenerator.prototype.slide=function(value,minvalue,maxvalue,generator)
{

    generator.currentValue=value;

    generator.GetRootContainer().find('.smartDonationsAmount').text(value);
    generator.ValueUpdated(generator,value);

    value=value-minvalue;

    value=value*0.7/(maxvalue-minvalue);

    generator.printSmile(value +.3);



}

smartDonationsSliderDonationGenerator.prototype.ValueUpdated=function(generator,value){}

smartDonationsSliderDonationGenerator.prototype.printSmile=function(smilePercentage)
{

    this.paper.clear();

    //interpolation
    this.paper.circle(25, 25, 24);

    this.paper.circle(16, 17, 5);
    this.paper.circle(34, 17, 5);

    this.paper.path("M" + this.interpolate(15, 10, smilePercentage) + " "
        + this.interpolate(35, 25, smilePercentage) + ",  C"
        + this.interpolate(15, 15, smilePercentage) + " "
        + this.interpolate(35, 45, smilePercentage) + "  ,  "
        + this.interpolate(35, 35, smilePercentage) + " "
        + this.interpolate(35, 45, smilePercentage) + ",    "
        + this.interpolate(35, 41, smilePercentage) + " "
        + this.interpolate(35, 25, smilePercentage));


    // paper.path("M0," + originY + " C" + smileSizeX.toString() + " " +(originY+smileSizeY).toString() + ", " + (100 - smileSizeX).toString() + " " + (originY+ smileSizeY).toString() + ",50 " + originY ).attr({ stroke: "red" });
}

smartDonationsSliderDonationGenerator.prototype.interpolate=function(start,end,smilePercentage) {
    return (start + ((end - start) * smilePercentage)).toString();
}



smartDonationsSliderDonationGenerator.prototype.changed=function() {

    printSmile(document.getElementById("text").value);
}

smartDonationsSliderDonationGenerator.prototype.GenerationCompleted=function()
{
    var generator=this;
    if(this.paper)
        this.paper.clear();


    try
    {
          generator.smartDonationsMaxValue=parseInt(generator.smartDonationsMaxValue);
          generator.smartDonationsMinValue=parseInt(generator.smartDonationsMinValue);
          generator.smartDonationIncrementOf=parseInt(generator.smartDonationIncrementOf);
    }catch(error)
    {
        generator.smartDonationsMaxValue=0;
        generator.smartDonationsMinValue=0;
        generator.smartDonationIncrementOf=1;

    }




    if(generator.smartDonationsMaxValue<=0||generator.smartDonationsMinValue<=0||generator.smartDonationIncrementOf<=0|| generator.smartDonationsMinValue>generator.smartDonationsMaxValue)
        return;






    rnJQuery(function(){
        var smileDiv=generator.GetRootContainer().find(".smartDonationsSmile");
        if(generator.paper)
        {
            generator.paper.clear();
            smileDiv.html('');

        }

        var defaultValue=generator.smartDonationsDefaultValue;
        var minValue=generator.smartDonationsMinValue;
        var maxValue=generator.smartDonationsMaxValue;
        var incrementOf=generator.smartDonationIncrementOf;
        var slideCallback=function(slide,ui){generator.slide(ui.value,minValue,maxValue,generator)};

        if(typeof generator.smartDonationAllowedValues !='undefined' && generator.smartDonationAllowedValues)
        {
            generator.allowedValuesArray=generator.smartDonationAllowedValues.split(',');
            for(var i=0;i<generator.allowedValuesArray.length;i++)
            {
                try
                {
                    generator.allowedValuesArray[i]=parseFloat(generator.allowedValuesArray[i]);
                }catch(exceptin)
                {

                    return;
                }
            }
            if(generator.allowedValuesArray.length>0)
            {
                generator.allowedValuesArray=generator.allowedValuesArray.sort(function(a,b){return a<b?-1:1});

                minValue=0;
                maxValue=generator.allowedValuesArray.length-1;
                incrementOf=1;
                try{
                    defaultValue=parseFloat(defaultValue);
                    defaultValue=generator.allowedValuesArray.indexOf(defaultValue);
                }catch(exception)
                {
                    defaultValue=0;
                }

                if(defaultValue<0)
                    defaultValue=0;
                slideCallback=function(slide,ui){generator.slide( generator.allowedValuesArray[ui.value], generator.allowedValuesArray[0], generator.allowedValuesArray[ generator.allowedValuesArray.length-1],generator)};


            }
        }else
        {
            if(generator.smartDonationsDefaultValue<generator.smartDonationsMinValue)
                generator.smartDonationsDefaultValue= generator.smartDonationsMinValue;

            if(generator.smartDonationsDefaultValue>generator.smartDonationsMaxValue)
                generator.smartDonationsDefaultValue= generator.smartDonationsMaxValue;
        }


        var rootContainer=generator.GetRootContainer().find(".smartDonationsSlide");
        rootContainer.slider({
            range: "min",
            value: defaultValue,
            min: minValue,
            max: maxValue,
            step:incrementOf,
            slide: slideCallback,
            create:function(event,ui)
            {
                rootContainer.find(".ui-slider-range-min").addClass("smartDonationsSliderBar").addClass("smartDonationsEditableItem");
                rootContainer.find(".ui-slider-range-min").addClass("smartDonationsSliderBar");
            }
        });
        generator.StyleItem();
        generator.paper = Raphael(smileDiv[0], 50, 50);


        generator.GetRootContainer().find('.smartDonationsAmount').text(defaultValue);
        generator.slide(defaultValue,minValue,maxValue,generator)
        var ui={};
        ui.value=defaultValue;
        slideCallback(null,ui);
    });



}

smartDonationsSliderDonationGenerator.prototype.GetDonationText=function (){
    return '<span class="smartDonationsSliderText smartDonationsCommentText smartDonationsEditableItem" >'+this.smartDonationText+'</span>';
}


smartDonationsSliderDonationGenerator.prototype.GetButtonTag=function()
{
    var imageToUse;
    if(typeof this.styles=='undefined')
       imageToUse="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif";
    else
       imageToUse=this.styles.smartDonationsDonationButton_src;

    return  '<input type="image" class="smartDonationsTextBoxDonationField smartDonationsDonationButton smartDonationsEditableItem" src="'+imageToUse+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>';

}
smartDonationsSliderDonationGenerator.prototype.DonationGeneratedCode=function()
{

        return   this.GetStartOfDonationForm(this.smartDonationsDefaultValue)+
            '<div  class="smartDonationsSlider" > '
                +                     this.GetDonationText()+
                    ' <table class="smartDonationsSliderTable" >\
                    <tr>                            \
                        <td><span class="smartDonationsCurrentDonationText smartDonationsEditableItem">Current Donation:</span><strong  class="smartDonationsAmount smartDonationsSliderDonationText smartDonationsEditableItem">10</strong></td>             \
                        <td rowspan="2"><div class="smartDonationsSmile smartDonationsSliderSmile "></div></td>                   \
                    </tr>                                                                                                                               \
                    <tr>      \
                        <td><div class="smartDonationsSlide smartDonationsSliderDiv " ></div></td> \
                        <td></td>                                         \
                    </tr> \
                    <tr>\
                        <td>\
                            '+this.GetButtonTag()+'\
                        </td>\
                    </tr>\
                </table>  \
            </div>'+this.GetEndOfDonationForm();




}

smartDonationsSliderDonationGenerator.prototype.SubmitFired=function(generator)
{
    generator.ChangeAmountToDonate(generator.currentValue);

}









