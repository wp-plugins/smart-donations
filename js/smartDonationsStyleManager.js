var smartDonationsCurrentElement;

function SmartDonationsStartStyling()
{
    smartDonationsEditDialog.dialog('open');
    if(smartDonationsDonationType&&smartDonationsDonationType.generator)
    {
        BindGeneratedItemToStyleEvents();
    }

}

function BindGeneratedItemToStyleEvents()
{
    var previousValue=null;
    var previousElement=null;
    rnJQuery("#smartDonationsPreviewEditionContainer").find('.smartDonationsEditableItem, .ui-slider-handle, .ui-slider-horizontal, .ui-slider-handle').hover(
        function(){
            event.stopPropagation();

            if(previousElement)
            {
                rnJQuery(previousElement).css('border', previousValue);
            }

            previousValue=rnJQuery(this).css('border');
            previousElement=this;
            rnJQuery(this).css('border', '3px solid black');
        },
        //unhover
        function(event){
            event.stopPropagation();
            rnJQuery(this).css('border', previousValue);
            previousElement=null;
            previousValue=null;
        }
    ).unbind('click').unbind('mousedown').click(function(event)
        {
            event.preventDefault();
            event.stopPropagation();
            var element=rnJQuery(this);
            smartDonationsCurrentElement=element;
            var tagName=element.prop("tagName").toUpperCase();

            if(tagName=="INPUT")
            {
                if(element.attr("type").toUpperCase()=="IMAGE")
                {
                    smartDonationsEditImage(element);
                }

                if(element.attr("type").toUpperCase()=="TEXT")
                {
                    smartDonationsEditTextBox(element);
                }


            }
            if(tagName=="SPAN" ||tagName=="STRONG")
            {
                smartDonationsEditText(element);
            }

            if(tagName=="IMG")
            {
                smartDonationsEditImage(element);
            }
            if(tagName=="DIV"||element.hasClass('ui-slider-handle'))
            {
                smartDonationsEditDiv(element);
            }

            if(element.hasClass('wepay-widget-button'))
            {
                smartDonationsEditWePayButton(element);
            }

        });
}


function SmartDonationsGetReferenceClass(element)
{
    if(element.hasClass('smartDonationsDonationButton'))
        return'smartDonationsDonationButton';

    if(element.hasClass('smartDonationsCommentText'))
        return 'smartDonationsCommentText';

    if(element.hasClass('smartDonationsDonationBox'))
        return 'smartDonationsDonationBox';



    if(element.hasClass('smartDonationsThreeButtonSpan1'))
        return 'smartDonationsThreeButtonSpan1';

    if(element.hasClass('smartDonationsThreeButtonSpan2'))
        return 'smartDonationsThreeButtonSpan2';

    if(element.hasClass('smartDonationsThreeButtonSpan3'))
        return 'smartDonationsThreeButtonSpan3';


    if(element.hasClass('smartDonationsThreeButtonImage1'))
        return 'smartDonationsThreeButtonImage1';

    if(element.hasClass('smartDonationsThreeButtonImage2'))
        return 'smartDonationsThreeButtonImage2';

    if(element.hasClass('smartDonationsThreeButtonImage3'))
        return 'smartDonationsThreeButtonImage3';



    if(element.hasClass('ui-slider-handle'))
        return 'ui-slider-handle';

    if(element.hasClass('ui-slider-horizontal'))
        return 'ui-slider-horizontal';

    if(element.hasClass('ui-slider-range-min'))
        return 'ui-slider-range-min';

    if(element.hasClass('smartDonationsCurrentDonationText'))
        return 'smartDonationsCurrentDonationText';

    if(element.hasClass('smartDonationsAmount'))
        return 'smartDonationsAmount';


    if(element.hasClass('wepay-widget-button'))
        return 'wepay-widget-button';






}

function SmartDonationsChangeCurrentStyle(styleElement,value)
{

    var className=SmartDonationsGetReferenceClass(smartDonationsCurrentElement);
    var propertyToSave=className;
    if(styleElement=="src")
    {
        propertyToSave=className+"_src";
        SmartDonationsEditImage(smartDonationsDonationType.generator,propertyToSave,value);
    }else
    {
        var property={};
        property[styleElement]=value;
        SmartDonationsEditStyle(smartDonationsDonationType.generator,propertyToSave,property);
    }



    smartDonationsDonationType.generator.GenerateDonationItem();
    smartDonationsCurrentElement= rnJQuery("#smartDonationsPreviewEditionContainer").find("."+className);
    BindGeneratedItemToStyleEvents();
}





/************************************************************************************* EDITTING ELEMENTS ***************************************************************************************************/



function smartDonationsEditImage(imageElement)
{
    var events=new Array();
    rnJQuery("#smartDonationsEditionArea").html(
        "<table>" +
             SmartDonationsAddImageField(imageElement,events,'src')+
             SmartDonationsAddNumericField(imageElement,events,'Width')+
             SmartDonationsAddNumericField(imageElement,events,'Height')+
       "</table>"
    );

    for(var i=0;i<events.length;i++)
        events[i]();
}




function smartDonationsEditText(element)
{
    var events=new Array();

    rnJQuery("#smartDonationsEditionArea").html(
        "<table>" +
            SmartDonationsAddFontFamily(element,events)+
            SmartDonationsAddColorPicker(element,events,'color')+
            SmartDonationsAddNumericField(element,events,'Font-Size')+
        "</table>"
    );

    for(var i=0;i<events.length;i++)
        events[i]();



}




function smartDonationsEditTextBox(element)
{
    var events=new Array();

    rnJQuery("#smartDonationsEditionArea").html(
        "<table>" +
            SmartDonationsAddFontFamily(element,events)+
            SmartDonationsAddColorPicker(element,events,'color')+
            SmartDonationsAddNumericField(element,events,'Font-Size')+
            SmartDonationsAddNumericField(element,events,'Width')+
            SmartDonationsAddNumericField(element,events,'Height')+
            "</table>"
    );

    for(var i=0;i<events.length;i++)
        events[i]();



}

function smartDonationsEditDiv(element)
{
    var events=new Array();

    rnJQuery("#smartDonationsEditionArea").html(
        "<table>" +
            SmartDonationsAddColorPicker(element,events,'Border-Color')+
            SmartDonationsAddNBorderStyle(element,events)+
            SmartDonationsAddNumericField(element,events,'Border-Width')+

            SmartDonationsAddColorPicker(element,events,'Background-Color')+
            SmartDonationsAddImageField(element,events,'Background-Image')+

            "</table>"
    );

    for(var i=0;i<events.length;i++)
        events[i]();
}


function smartDonationsEditWePayButton(element)
{
    var events=new Array();

    rnJQuery("#smartDonationsEditionArea").html(
        "<table>" +

            SmartDonationsAddFontFamily(element,events)+
            SmartDonationsAddColorPicker(element,events,'color')+
            SmartDonationsAddNumericField(element,events,'Font-Size')+

            SmartDonationsAddColorPicker(element,events,'Border-Color')+
            SmartDonationsAddNBorderStyle(element,events)+
            SmartDonationsAddNumericField(element,events,'Border-Width')+

            SmartDonationsAddColorPicker(element,events,'Background-Color')+
            SmartDonationsAddImageField(element,events,'Background-Image')+

            "</table>"
    );

    for(var i=0;i<events.length;i++)
        events[i]();
}


/************************************************************************************* ADD FIELDS ***************************************************************************************************/



function SmartDonationsAddFontFamily(element,eventListener)
{
    eventListener.push(function(){
        rnJQuery("#smartDonationsEditFont").change(function()
        {
            SmartDonationsChangeCurrentStyle("font-family",rnJQuery("#smartDonationsEditFont").val());
        });
    });

    var fonts = new Array(
        'Arial,Helvetica,sans-serif',
        'Arial Black,Gadget,sans-serif',
        'Comic Sans MS,cursive',
        'Courier New,Courier,monospace',
        'Georgia,serif',
        'Impact,Charcoal,sans-serif',
        'Lucida Console,Monaco,monospace',
        'Lucida Sans Unicode,Lucida Grande,sans-serif',
        'Palatino Linotype,Book Antiqua,Palatino,serif',
        'Tahoma,Geneva,sans-serif',
        'Times New Roman,Times,serif',
        'Trebuchet MS,Helvetica,sans-serif',
        'Verdana,Geneva,sans-serif' );

    var fontOptions="";
    var selectedFont=element.css('font-family');

    if(selectedFont)
    {
        var indexOfFont=fonts.indexOf(selectedFont);
        if(indexOfFont>0)
            selectedFont=fonts[indexOfFont];
        else
            fonts.push(selectedFont);


    }else
        selectedFont=fonts[0];
    for(var i=0;i<fonts.length;i++)
    {
        if(fonts[i]==selectedFont)
            fontOptions+="<option value='"+fonts[i]+"' selected='sel'>"+fonts[i]+"</option>";
        else
            fontOptions+="<option value='"+fonts[i]+"'>"+fonts[i]+"</option>";

    }

    return "<tr>" +
        "   <td>" +
        "Font Family" +
        "</td>" +
        "   <td> " +
        "<select id='smartDonationsEditFont'  style='width:500px'>"+
        fontOptions+
        "</select>"  +
        "   </td>" +
        "</tr>" ;
}


function SmartDonationsAddNumericField(imageElement,eventListener,attribute)
{
    eventListener.push(function(){rnJQuery("#SmartDonationsAddNumericField_"+attribute).keyup(function()
    {
        SmartDonationsChangeCurrentStyle(attribute.toLowerCase(),rnJQuery("#SmartDonationsAddNumericField_"+attribute).val());

    })});

    return "<tr>" +
        "   <td>" +
        attribute +
        "</td>" +
        "   <td> " +
        "<input type='text' id='SmartDonationsAddNumericField_"+attribute+"' class='smartDonationsNumericField_Larger' value='"+imageElement.css(attribute.toLowerCase())+"'/>"  +
        "   </td>" +
        "</tr>";
}


function SmartDonationsAddImageField(imageElement,eventListener,attribute)
{
    var currentValue="";

    if(attribute.toLowerCase()=="src")
        currentValue=imageElement.attr("src");
    else
        currentValue=imageElement.css(attribute.toLowerCase());


    eventListener.push(function(){rnJQuery("#smartDonationsEditImage_"+attribute).keyup(function()
    {
        var selectedValue=rnJQuery("#smartDonationsEditImage_"+attribute).val();
        if(attribute.toLowerCase()=='background-image'&&!selectedValue)
            selectedValue="none";


        SmartDonationsChangeCurrentStyle(attribute.toLowerCase(),selectedValue);

    })});

    return "<tr>" +
        "   <td>" +
        attribute+
        "</td>" +
        "   <td> " +
        "<input type='text' id='smartDonationsEditImage_"+attribute+"'  style='width:500px' value='"+currentValue+"'/>"  +
        "   </td>" +
        "</tr>";


}


function SmartDonationsAddColorPicker(imageElement,eventListener,attribute)
{
    eventListener.push(function(){
        jscolor.init();
        rnJQuery('#smartDonationsEditColor_'+attribute).change(function()
        {
            SmartDonationsChangeCurrentStyle(attribute.toLowerCase(),'#'+this.color.toString());
        });
    });

    return "<tr> " +
        "<td>" +
        attribute +
        "</td>" +
        "<td>" +
            "<input id='smartDonationsEditColor_"+attribute+"' class='color' value='"+RGBToEx(imageElement.css(attribute))+"'/>"
        "</td>" +
    "</tr>"
}




function SmartDonationsAddNBorderStyle(element,eventListener)
{
    eventListener.push(function(){
        rnJQuery("#smartDonationsEditBorderStyle").change(function()
        {
            SmartDonationsChangeCurrentStyle("border-style",rnJQuery("#smartDonationsEditBorderStyle").val());
        });
    });

    var fonts = new Array(
        'none',
        'dotted',
        'dashed',
        'solid',
        'double');

    var fontOptions="";
    var selectedFont=element.css('border-style');

    if(selectedFont)
    {
        var indexOfFont=fonts.indexOf(selectedFont);
        if(indexOfFont>0)
            selectedFont=fonts[indexOfFont];
        else
            fonts.push(selectedFont);


    }else
        selectedFont=fonts[0];
    for(var i=0;i<fonts.length;i++)
    {
        if(fonts[i]==selectedFont)
            fontOptions+="<option value='"+fonts[i]+"' selected='sel'>"+fonts[i]+"</option>";
        else
            fontOptions+="<option value='"+fonts[i]+"'>"+fonts[i]+"</option>";

    }

    return "<tr>" +
        "   <td>" +
        "Border-Style" +
        "</td>" +
        "   <td> " +
        "<select id='smartDonationsEditBorderStyle' >"+
        fontOptions+
        "</select>"  +
        "   </td>" +
        "</tr>" ;
}




/************************************************************************************* EXTRAS  ***************************************************************************************************/





function RGBToEx(rgb) {
    if(typeof rgb =='undefined')
        return '';
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}