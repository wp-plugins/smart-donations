
/***Base Object*******/
function smartDonationsLoadDonation(options,containerName)
{
    var donationTypeSelected= options.smartDonationsType;
    var aux;
    if(donationTypeSelected=='classic')
        aux=new smartDonationsClassicDonationGenerator(containerName,options);
    if(donationTypeSelected=='textbox')
        aux=new smartDonationsTextBoxDonationGenerator(containerName,options);
    if(donationTypeSelected=="threeButtons")
        aux=new smartDonationsThreeButtonsDonationGenerator(containerName,options);
    if(donationTypeSelected=="slider")
        aux=new smartDonationsSliderDonationGenerator(containerName,options);
    aux.GenerateDonationItem();
}


function smartDonationsBaseGenerator(containerName2,options){
    this.containerName=containerName2;
    if(options)
    {
        this.business=options.business;
        this.returningUrl=options.returningUrl;
    }

}

smartDonationsBaseGenerator.prototype.DonationGeneratedCode=function(){};

smartDonationsBaseGenerator.prototype.GenerateDonationItem=function()
{
    var generator=this;
    rnJQuery('#'+this.containerName).html(this.DonationGeneratedCode());
    rnJQuery('#'+this.containerName).find(".donationForm").submit(function(){generator.SubmitFired(generator)});
    this.GenerationCompleted();
}

smartDonationsBaseGenerator.prototype.GenerationCompleted=function()
{

}

smartDonationsBaseGenerator.prototype.SubmitFired=function(generator)
{

}

smartDonationsBaseGenerator.prototype.GetStartOfDonationForm=function(defaultQuantity)
{
    var donationText= '<div class="smartDonationsDonationGeneratedItem"  >\
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" class="donationForm" target="_blank">      \
                <input type="hidden" name="cmd" value="_donations">\
                <input type="hidden" name="business" value="'+this.business+'">\
                <input type="hidden" name="lc" value="US">                       \
                <input type="hidden" name="no_note" value="0">                    \
                <input type="hidden" name="currency_code" value="USD">             \
                <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">';

    if(this.returningUrl)
        donationText+='<input type="hidden" name="return" class="amountToDonate" value="'+this.returningUrl+'">';

    if(defaultQuantity)
        donationText+='<input type="hidden" name="amount" class="amountToDonate" value="'+defaultQuantity+'">';

    return donationText;


};


smartDonationsBaseGenerator.prototype.ChangeAmountToDonate=function(amount)
{
    try
    {
        var amount=parseFloat(amount);
        rnJQuery('#'+this.containerName).find(".amountToDonate").val(amount);
    }catch(exception)
    {

    }
}


smartDonationsBaseGenerator.prototype.GetEndOfDonationForm=function()
{
    return '</form>\
             </div>';
};



/****Classic Generator***************************************/
function smartDonationsClassicDonationGenerator(containerName,options){
    smartDonationsBaseGenerator.call(this,containerName,options);
    if(options)
    {
        this.smartDonationsdisplaycreditlogo=options.smartDonationsdisplaycreditlogo;
    }else
        this.smartDonationsdisplaycreditlogo=false;
}

smartDonationsClassicDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

smartDonationsClassicDonationGenerator.prototype.DonationGeneratedCode=function()
{
    if(this.smartDonationsdisplaycreditlogo)
    {
        return   this.GetStartOfDonationForm()+
                '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'+this.GetEndOfDonationForm();


    }
    return this.GetStartOfDonationForm()+
           '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> \
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'
            +this.GetEndOfDonationForm();

}




/****Text Box Generator***************************************/
function smartDonationsTextBoxDonationGenerator(containerName,options){
    smartDonationsBaseGenerator.call(this,containerName,options);

    if(options)
    {
        this.smartDonationsComment=options.smartDonationsComment;
        this.smartDonationsRecommendedDonation=options.smartDonationsRecommendedDonation;
        this.smartDonationsStyle=options.smartDonationsStyle;
    }else
    {
        this.smartDonationsComment='If you like this plugin, please donate';
        this.smartDonationsRecommendedDonation=15;
        this.smartDonationsStyle=2;
    }
}

smartDonationsTextBoxDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

smartDonationsTextBoxDonationGenerator.prototype.GetCommentTag=function()
{
    return '<span class="smartDonationsTextBoxDonationField">'+this.smartDonationsComment+'</span>';
}

smartDonationsTextBoxDonationGenerator.prototype.GetTextBoxTag=function()
{
    return '<input type="text" class="smartDonationsNumericField smartDonationsTextBoxDonationField smartDonationsDonationBox"  value="'+this.smartDonationsRecommendedDonation+'">';
}

smartDonationsTextBoxDonationGenerator.prototype.GetButtonTag=function()
{
    return  '<input type="image" class="smartDonationsTextBoxDonationField" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>';

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


    /****Three buttons Generator***************************************/
    function smartDonationsThreeButtonsDonationGenerator(containerName,options){
        smartDonationsBaseGenerator.call(this,containerName,options);


        if(options)
        {
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
        }else
        {
            this.smartDonationButtonStyle1="threeButtonsStyle1.png";
            this.smartDonationButtonText1="Thank you (&#36;5)";
            this.smartdonationsDonationquantity1=5;

            this.smartDonationButtonStyle2="threeButtonsStyle1.png";
            this.smartDonationButtonText2="Wow, Thanks!(&#36;15)";
            this.smartdonationsDonationquantity2=15;

            this.smartDonationButtonStyle3="threeButtonsStyle1.png";
            this.smartDonationButtonText3="You... Just Rock(&#36;25)";
            this.smartdonationsDonationquantity3=25;

            this.smartDonationSameSize=true;
        }


    }
    smartDonationsThreeButtonsDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

    smartDonationsThreeButtonsDonationGenerator.prototype.AdjustSize=function(image,span,generator)
    {
        var image = rnJQuery('#'+this.containerName).find(image);
        var text = rnJQuery('#'+this.containerName).find(span);

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
             var spans=rnJQuery('#'+generator.containerName).find('.smartDonationsThreeButtonSpan1,.smartDonationsThreeButtonSpan2,.smartDonationsThreeButtonSpan3');
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
        return '<div class="smartDonationsThreeButtonsDiv1" >'+ this.GetStartOfDonationForm(this.smartdonationsDonationquantity1)+
            '<div class="smartdonationsThreeButtonStyle"> \
                <image class="smartDonationsThreeButtonImage1 smartDonationsThreeButton" src="" />\
                <span class="smartDonationsThreeButtonSpan1 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText1+'</span>\
             </div>'+this.GetEndOfDonationForm()+
            this.GetStartOfDonationForm(this.smartdonationsDonationquantity2)+
            '<div class="smartdonationsThreeButtonStyle smartDonationsThreeButtonMiddleDiv" > \
                <image class="smartDonationsThreeButtonImage2 smartDonationsThreeButton" src=""/>\
                <span class="smartDonationsThreeButtonSpan2 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText2+'</span>\
             </div>'+this.GetEndOfDonationForm()+
            this.GetStartOfDonationForm(this.smartdonationsDonationquantity3)+
            '<div class="smartdonationsThreeButtonStyle"> \
                <image class="smartDonationsThreeButtonImage3 smartDonationsThreeButton" src="" />\
                <span class="smartDonationsThreeButtonSpan3 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText3+'</span>\
             </div>'+this.GetEndOfDonationForm()+'</div>';


    }


    smartDonationsThreeButtonsDonationGenerator.prototype.GenerationCompleted=function()
    {
        var generator=this;

        rnJQuery(function()
        {
            rnJQuery('#'+generator.containerName).find('.smartDonationsDonationGeneratedItem').css('display','inline-block');
        })

        rnJQuery(function(){
            generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage1','.smartDonationsThreeButtonSpan1',generator.smartDonationButtonStyle1);
            generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage2','.smartDonationsThreeButtonSpan2',generator.smartDonationButtonStyle2);
            generator.CreateAndLayoutImage('.smartDonationsThreeButtonImage3','.smartDonationsThreeButtonSpan3',generator.smartDonationButtonStyle3);
        });


    }

    smartDonationsThreeButtonsDonationGenerator.prototype.CreateAndLayoutImage=function(image,span,imageName)
    {
        var generator=this;
        rnJQuery('#'+generator.containerName).find(image).attr('src',smartDonationsRootPath+'/images/'+imageName).load(function(){generator.AdjustSize(image,span,generator)});
        rnJQuery('#'+generator.containerName).find(image+','+span).click(function(){
            rnJQuery(this).parent().parent().submit();
        });
    }












/****Slider Generator******************************************************************************************/
function smartDonationsSliderDonationGenerator(containerName,options){
    smartDonationsBaseGenerator.call(this,containerName,options);

    if(options)
    {
        this.smartDonationText=options.smartDonationText;
        this.smartDonationsMinValue=options.smartDonationsMinValue;
        this.smartDonationsMaxValue=options.smartDonationsMaxValue;
        this.smartDonationsDefaultValue=options.smartDonationsDefaultValue;
        this.smartDonationIncrementOf=options.smartDonationIncrementOf;
        this.currentValue=options.smartDonationsDefaultValue;
    }else{
        this.smartDonationText="If you like it, please donate.";
        this.smartDonationsMinValue=5;
        this.smartDonationsMaxValue=50;
        this.smartDonationsDefaultValue=25;
        this.smartDonationInCrementOf=5;
        this.currentValue=this.smartDonationsDefaultValue;
    }




}

smartDonationsSliderDonationGenerator.prototype=Object.create(smartDonationsBaseGenerator.prototype);

smartDonationsSliderDonationGenerator.prototype.slide=function(event,ui,generator)
{
    if(ui)
        var value=ui.value;
    else
        var value=generator.smartDonationsDefaultValue;

    generator.currentValue=value;

    rnJQuery('#'+generator.containerName).find('.smartDonationsAmount').text(value);

    value=value-generator.smartDonationsMinValue;

    value=value*0.7/(generator.smartDonationsMaxValue-generator.smartDonationsMinValue);

    generator.printSmile(value +.3);

}


smartDonationsSliderDonationGenerator.prototype.printSmile=function(smilePercentage)
{

    this.paper.clear();

    //interpolation
    this.paper.circle(25, 25, 24);

    this.paper.circle(16, 17, 5);
    this.paper.circle(34, 17, 5);

    circle = this.paper.circle(70, 10, 7);
    circle.attr("fill", "black");
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


    if(generator.smartDonationsDefaultValue<generator.smartDonationsMinValue)
        generator.smartDonationsDefaultValue= generator.smartDonationsMinValue;

    if(generator.smartDonationsDefaultValue>generator.smartDonationsMaxValue)
        generator.smartDonationsDefaultValue= generator.smartDonationsMaxValue;

    generator.value=generator.smartDonationsDefaultValue;

    rnJQuery(function(){
        var smileDiv=rnJQuery('#'+generator.containerName).find(".smartDonationsSmile");
        if(generator.paper)
        {
            generator.paper.clear();
            smileDiv.html('');

        }
        rnJQuery('#'+generator.containerName).find(".smartDonationsSlide").slider({
            range: "min",
            value: generator.smartDonationsDefaultValue,
            min: generator.smartDonationsMinValue,
            max: generator.smartDonationsMaxValue,
            step:generator.smartDonationIncrementOf,
            slide: function(slide,ui){generator.slide(slide,ui,generator);}
        });
        generator.paper = Raphael(smileDiv[0], 50, 50);


        rnJQuery('#'+generator.containerName).find('.smartDonationsAmount').text(generator.value);
        generator.value=generator.value-generator.smartDonationsMinValue;
        generator.value=generator.value*0.7/(generator.smartDonationsMaxValue-generator.smartDonationsMinValue);
        generator.slide(null,null,generator);
    });



}

smartDonationsSliderDonationGenerator.prototype.GetDonationText=function (){
    return '<span class="smartDonationsSliderText" >'+this.smartDonationText+'</span>';
}


smartDonationsSliderDonationGenerator.prototype.GetButtonTag=function()
{
    return  '<input type="image" class="smartDonationsTextBoxDonationField" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>';

}
smartDonationsSliderDonationGenerator.prototype.DonationGeneratedCode=function()
{

        return   this.GetStartOfDonationForm(this.smartDonationsDefaultValue)+
            '<div  class="smartDonationsSlider" > '
                +                     this.GetDonationText()+
                    ' <table class="smartDonationsSliderTable" >\
                    <tr>                            \
                        <td><span>Current Donation:</span><strong  class="smartDonationsAmount smartDonationsSliderDonationText">10</strong></td>             \
                        <td rowspan="2"><div class="smartDonationsSmile smartDonationsSliderSmile"></div></td>                   \
                    </tr>                                                                                                                               \
                    <tr>      \
                        <td><div class="smartDonationsSlide smartDonationsSliderDiv" ></div></td> \
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









