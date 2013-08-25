"use strict";

function RedNaoFormElementEscape(property)
{
    return property.replace(' ','_');
}

function RedNaoCreateFormElementByName(elementName)
{
    if(elementName=='rednaotextinput')
        return new TextInputElement();
    if(elementName=='rednaodonationamount')
        return new DonationAmountElement();
    if(elementName=='rednaoprependedtext')
        return new PrependTexElement();
    if(elementName=='rednaoappendedtext')
        return new AppendedTexElement();
    if(elementName=='rednaoprependedcheckbox')
        return new PrependCheckBoxElement();
    if(elementName=='rednaoappendedcheckbox')
        return new AppendCheckBoxElement();
    if(elementName=='rednaobuttondropdown')
        return 'rednaobuttondropdown';
    if(elementName=='tabradioscheckboxes')
        return 'tabradioscheckboxes';
    if(elementName=='rednaomultiplecheckboxes')
        return new MultipleCheckBoxElement();
    if(elementName=='rednaoinlinecheckboxes')
        return new InlineCheckboxElement();
    if(elementName=='rednaoselectbasic')
        return new SelectBasicElement();
    if(elementName=='rednaoselectmultiple')
        return new SelectMultipleElement();
    if(elementName=='rednaofilebutton')
        return 'rednaofilebutton';
    if(elementName=='rednaosinglebutton')
        return 'rednaosinglebutton';
    if(elementName=='rednaodoublebutton')
        return 'rednaodoublebutton';
    if(elementName=='rednaotitle')
        return new TitleElement();
    if(elementName=='rednaotextarea')
        return  new TextAreaElement();
    if(elementName=='rednaomultipleradios')
        return new MultipleRadioElement();
    if(elementName=='rednaoinlineradios')
        return new InlineRadioElement();
    if(elementName=='rednaodonationbutton')
        return new DonationButtonElement();

}



function RedNaoCreateFormElementByOptions(options)
{
    var element=RedNaoCreateFormElementByName(options.ClassName);
    element.Options=options;

    return element;

}

/************************************************************************************* Base Class  ***************************************************************************************************/
function FormElementBase(Options)
{
    this.Options=new Object();
    this.Options.Styles=new Object();
    this.Options.ClassName="";
    FormElementBase.IdCounter++;
    this.Id='redNaoFormElement'+FormElementBase.IdCounter;
    this.Properties=null;


    this.Options.Styles.rednao_control_label='float: left;width: 160px;padding-top: 5px;text-align: right;'
    this.Options.Styles.redNaoControls="margin-left:180px;text-align:left;"
    this.Options.Styles.redNaoHelp="margin:0px;padding:0px;text-align:left;"
    this.GenerateDefaultStyle();



}

FormElementBase.IdCounter=0;


FormElementBase.prototype.GenerateDefaultStyle=function()
{
}


FormElementBase.prototype.GenerateHtml=function(jqueryElement)
{
    jqueryElement.replaceWith( '<div class="rednao-control-group '+this.Options.ClassName+'" id="'+this.Id+'" style="margin-bottom:15px;">'+this.GenerateInlineElement()+'</div>');
    this.ApplyStyle();

}

FormElementBase.prototype.AppendElementToContainer=function(jqueryElement)
{
    jqueryElement.append( '<div class="rednao-control-group '+this.Options.ClassName+'" id="'+this.Id+'" style="margin-bottom:15px;">'+this.GenerateInlineElement()+'</div>');
    this.ApplyStyle();

}

FormElementBase.prototype.CreateProperties=function()
{
    throw 'Abstract method';
}

FormElementBase.prototype.GenerateInlineElement=function()
{
    throw 'Abstract method';
}

FormElementBase.prototype.GetProperties=function()
{
    if(this.Properties==null)
    {
        this.Properties=new Array();
        this.CreateProperties();
    }

    return this.Properties;
}


FormElementBase.prototype.UpdateProperties=function()
{
    if(this.Properties!=null)
    {
        for(var i=0;i<this.Properties.length;i++)
        {
            this.Properties[i].UpdateProperty();
        }
    }
}

FormElementBase.prototype.GetPropertyName=function()
{
    return RedNaoFormElementEscape(this.Options.Label);
}



FormElementBase.prototype.ApplyStyle=function()
{
    if(this.Options.Styles==null)
        return;

    for(var property in this.Options.Styles)
    {

        rnJQuery('#'+this.Id + ' .'+property).attr("style",this.Options.Styles[property]);
    }
}


FormElementBase.prototype.GeneratePropertiesHtml=function(jQueryObject)
{
    var properties=this.GetProperties();
    for(var i=0;i<properties.length;i++)
    {
        properties[i].CreateProperty(jQueryObject);
    }
}


FormElementBase.prototype.GetValueString=function()
{

}

/************************************************************************************* Title Element ***************************************************************************************************/

function TitleElement()
{
    FormElementBase.call(this);
    this.Title="Title";

    this.Options.ClassName="rednaotitle";
    this.Options.Title="Title";
}

TitleElement.prototype=Object.create(FormElementBase.prototype);

TitleElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Title","Title",'basic'));
}

TitleElement.prototype.GenerateInlineElement=function()
{
    return '<legend class="redNaoLegend">'+this.Options.Title+'</legend>';
}


TitleElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoLegend='margin:0px;padding:0px;text-align:left;font-size:21px;line-height:40px;color:#333;border:0;border-bottom: 1px solid #e5e5e5;width:100%;';
}

TitleElement.prototype.GetValueString=function()
{
    return '';

}

/************************************************************************************* Text Element ***************************************************************************************************/

function TextInputElement()
{
    FormElementBase.call(this);
    this.Title="Text Input";

    this.Options.ClassName="rednaotextinput";
    this.Options.Label="Text Input";
    this.Options.Placeholder="Placeholder";
    this.Options.Help="Help";




}

TextInputElement.prototype=Object.create(FormElementBase.prototype);

TextInputElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));

}

TextInputElement.prototype.GenerateInlineElement=function()
{

    return '<label class="rednao_control_label" >'+this.Options.Label+'</label>\
                <div class="redNaoControls">\
                    <input  name="'+this.GetPropertyName()+'" type="text" placeholder="'+this.Options.Placeholder+'" class="redNaoInputText">'+
                    (this.Options.Help?' <p class="redNaoHelp">'+this.Options.Help+'</p>':'')+
                '</div>';
}

TextInputElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='height:20px;width:300px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;';

}


TextInputElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}



/************************************************************************************* Donation Amount ***************************************************************************************************/

function DonationAmountElement()
{
    FormElementBase.call(this);
    this.Title="Donation Amount";

    this.Options.ClassName="rednaodonationamount";
    this.Options.Label="Donation Amount";
    this.Options.Placeholder="Amount";
    this.Options.Help="Help";




}

DonationAmountElement.prototype=Object.create(FormElementBase.prototype);

DonationAmountElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));

}

DonationAmountElement.prototype.GenerateInlineElement=function()
{

    return '<label class="rednao_control_label" >'+this.Options.Label+'</label>\
                <div class="redNaoControls">\
                    <input  name="amount" type="text" placeholder="'+this.Options.Placeholder+'" class="redNaoInputText">'+
        (this.Options.Help?' <p class="redNaoHelp">'+this.Options.Help+'</p>':'')+
        '</div>';
}

DonationAmountElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='text-align:right;height:20px;width:50px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;';

}

DonationAmountElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}

/************************************************************************************* Prepend Text Element ***************************************************************************************************/

function PrependTexElement()
{
    FormElementBase.call(this);
    this.Title="Prepend Text";

    this.Options.Label="Prepend Text";
    this.Options.ClassName="rednaoprependedtext";
    this.Options.Placeholder="Placeholder";
    this.Options.Help="Help";
    this.Options.Prepend="Prepend";




}

PrependTexElement.prototype=Object.create(FormElementBase.prototype);

PrependTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Prepend","Prepend",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));

}

PrependTexElement.prototype.GenerateInlineElement=function()
{

    return '<label class="rednao_control_label" for="prependedtext">'+this.Options.Label+'</label>\
            <div class="redNaoControls">\
               <div class="rednao-input-prepend">\
                    <span class="redNaoPrepend">'+this.Options.Prepend+'</span>\
                    <input id="prependedtext" name="prependedtext" class="redNaoInputText" placeholder="'+this.Options.Placeholder+'" type="text">\
                </div>\
            <p class="redNaoHelp">'+this.Options.Help+'</p>\
            </div>';
}

PrependTexElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='height:20px;width:250px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 0 4px 4px 0;-moz-border-radius: 0 4px 4px 0;border-radius: 0 4px 4px 0;';
    this.Options.Styles.redNaoPrepend='margin-right: -5px;vertical-align: top;display: inline-block;width: auto;height: 20px;min-width: 16px;padding: 4px 5px;font-size: 14px;font-weight: normal;line-height: 20px;text-align: center;    text-shadow: 0 1px 0 #fff;background-color: #eee;border: 1px solid #ccc;-webkit-border-radius: 4px 0 0 4px;-moz-border-radius: 4px 0 0 4px;border-radius: 4px 0 0 4px;';
}



PrependTexElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}



/************************************************************************************* Appended Text Element ***************************************************************************************************/

function AppendedTexElement()
{
    FormElementBase.call(this);
    this.Title="Appended Text";

    this.Options.Label="Appended Text";
    this.Options.ClassName="rednaoappendedtext";
    this.Options.Placeholder="Placeholder";
    this.Options.Help="Help";
    this.Options.Append="Append";




}

AppendedTexElement.prototype=Object.create(FormElementBase.prototype);

AppendedTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Append","Append",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));

}

AppendedTexElement.prototype.GenerateInlineElement=function()
{
    return '<label class="rednao_control_label" for="appendedtext">'+this.Options.Label+'</label>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input id="appendedtext" name="appendedtext"  placeholder="'+this.Options.Placeholder+'" type="text" class="redNaoInputText">\
                    <span class="redNaoAppend">'+this.Options.Append+'</span>\
                </div>\
                <p class="redNaoHelp">'+this.Options.Help+'</p>\
            </div>';


}

AppendedTexElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='height:20px;width:250px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;';
    this.Options.Styles.redNaoAppend='-webkit-border-radius: 0 4px 4px 0;-moz-border-radius: 0 4px 4px 0;border-radius: 0 4px 4px 0;margin-left: -6px;vertical-align: top;display: inline-block;width: auto;height: 20px;min-width: 16px;padding: 4px 5px;font-size: 14px;font-weight: normal;line-height: 20px;text-align: center;text-shadow: 0 1px 0 #fff;background-color: #eee;border: 1px solid #ccc;';
}




AppendedTexElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}


/************************************************************************************* Prepend Checkbox Element ***************************************************************************************************/

function PrependCheckBoxElement()
{
    FormElementBase.call(this);
    this.Title="Prepend Checkbox";

    this.Options.Label="Prepend Checkbox";
    this.Options.ClassName="rednaoprependedcheckbox";
    this.Options.Placeholder="Placeholder";
    this.Options.Help="Help";
    this.Options.IsChecked='n';

}

PrependCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

PrependCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this.Options,"IsChecked","Is Checked",'basic'));

}

PrependCheckBoxElement.prototype.GenerateInlineElement=function()
{
    return '<label class="rednao_control_label" for="prependedcheckbox">'+this.Options.Label+'</label>\
                <div class="redNaoControls">\
                    <div class="input-prepend">\
                    <span class="redNaoPrepend">\
                        <label class="rednao_checkbox">\
                            <input type="checkbox" class="redNaoRealCheckBox"  '+(this.Options.IsChecked=='y'? 'checked="checked"':'')+'/>\
                        </label>\
                    </span>\
                    <input id="prependedcheckbox" name="prependedcheckbox"  class="redNaoInputText" type="text" placeholder="'+this.Options.Placeholder+'"/>\
                    </div>\
                    <p class="redNaoHelp">'+this.Options.Help+'</p>\
                </div>';


}

PrependCheckBoxElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='height:20px;width:300px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 0 4px 4px 0;-moz-border-radius: 0 4px 4px 0;border-radius: 0 4px 4px 0;';
    this.Options.Styles.redNaoPrepend='margin-right: -4px;vertical-align: top;display: inline-block;width: auto;height: 20px;min-width: 16px;padding: 4px 5px;font-size: 14px;font-weight: normal;line-height: 20px;text-align: center;    text-shadow: 0 1px 0 #fff;background-color: #eee;border: 1px solid #ccc;-webkit-border-radius: 4px 0 0 4px;-moz-border-radius: 4px 0 0 4px;border-radius: 4px 0 0 4px;font-size:0px;';
    this.Options.Styles.redNaoRealCheckBox="vertical-align:baseline;";
}



PrependCheckBoxElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+(rnJQuery('#'+this.Id+ ' .redNaoRealCheckBox').is(':checked')?'Yes':'No')+'. '+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val()) ;
}



/************************************************************************************* Append Checkbox Element ***************************************************************************************************/

function AppendCheckBoxElement()
{
    FormElementBase.call(this);
    this.Title="Append Checkbox";

    this.Options.Label="Append Checkbox";
    this.Options.ClassName="rednaoappendedcheckbox";
    this.Options.Placeholder="Placeholder";
    this.Options.Help="Help";
    this.Options.IsChecked='n';

}

AppendCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

AppendCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"Help","Help",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this.Options,"IsChecked","Is Checked",'basic'));

}

AppendCheckBoxElement.prototype.GenerateInlineElement=function()
{
    return '<label class="rednao_control_label" for="appendedcheckbox">'+this.Options.Label+'</label>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input id="appendedcheckbox" class="redNaoInputText" name="appendedcheckbox" class="span2" type="text" placeholder="'+this.Options.Placeholder+'"/>\
                        <span class="redNaoAppend">\
                            <input type="checkbox" class="redNaoRealCheckBox"   '+(this.Options.IsChecked=='y'? 'checked="checked"':'')+'/>\
                        </span>\
                </div>\
                <p class="redNaoHelp">'+this.Options.Help+'</p>\
            </div>';


}

AppendCheckBoxElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoInputText='height:20px;width:300px;margin:0;vertical-align:middle;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;line-height: 20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;';
    this.Options.Styles.redNaoAppend='-webkit-border-radius: 0 4px 4px 0;-moz-border-radius: 0 4px 4px 0;border-radius: 0 4px 4px 0;margin-left: -6px;vertical-align: top;display: inline-block;width: auto;height: 20px;min-width: 16px;padding: 4px 5px;font-size: 14px;font-weight: normal;line-height: 20px;text-align: center;text-shadow: 0 1px 0 #fff;background-color: #eee;border: 1px solid #ccc;font-size:0px;';
    this.Options.Styles.redNaoRealCheckBox="vertical-align:baseline";
}


AppendCheckBoxElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+(rnJQuery('#'+this.Id+ ' .redNaoRealCheckBox').is(':checked')?'Yes':'No')+'. '+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}


/************************************************************************************* Text Area Element ***************************************************************************************************/

function TextAreaElement()
{
    FormElementBase.call(this);
    this.Title="Text Area";

    this.Options.Label="Text Area";
    this.Options.DefaultText="Default Text";
    this.Options.ClassName="rednaotextarea";

}

TextAreaElement.prototype=Object.create(FormElementBase.prototype);

TextAreaElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options,"DefaultText","Default Text",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoTextArea'}));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"height","Height",{type:'style',class:'redNaoTextArea'}));


}

TextAreaElement.prototype.GenerateInlineElement=function()
{

    return  '<label class="rednao_control_label" for="textarea">'+this.Options.Label+'</label>\
                <div class="redNaoControls">\
                <textarea  name="textarea" class="redNaoTextArea">'+this.Options.DefaultText+'</textarea>\
            </div>';
}

TextAreaElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoTextArea='width:300px;height:50px;background-color: #fff;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border linear .2s, box-shadow linear .2s;-moz-transition: border linear .2s, box-shadow linear .2s;-o-transition: border linear .2s, box-shadow linear .2s;transition: border linear .2s, box-shadow linear .2s;padding: 4px 6px;';
}

TextAreaElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoTextArea').val());
}




/*************************************************************************************Multiple Radio Element ***************************************************************************************************/

function MultipleRadioElement()
{
    FormElementBase.call(this);
    this.Title="Multiple Radio";

    this.Options.Label="Multiple Radio";
    this.Options.ClassName="rednaomultipleradios";
    this.Options.Options=new Array('Option 1','Option 2');

}

MultipleRadioElement.prototype=Object.create(FormElementBase.prototype);

MultipleRadioElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));



}

MultipleRadioElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">';

    var checked='checked="checked"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoRadio" for="radios-0">\
                    <input class="redNaoRadio redNaoInputRadio" type="radio" name="'+this.GetPropertyName()+'"  value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+checked+'>'+rnJQuery.trim(this.Options.Options[i])+'</input>\
                </label>';

        checked="";

    }

        html+='</div>';
    return html;
}


MultipleRadioElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoRadio='padding-top:5px;padding-left: 20px;display: block;line-height: 18px';
    this.Options.Styles.redNaoInputRadio='float: left;margin-left: -20px;width:auto;'
}


MultipleRadioElement.prototype.GetValueString=function()
{

    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery.trim(rnJQuery('#'+this.Id+ ' .redNaoInputRadio:checked').parent().text()));
}


/*************************************************************************************Inline Radio Element ***************************************************************************************************/

function InlineRadioElement()
{
    FormElementBase.call(this);
    this.Title="Inline Radio";

    this.Options.Label="Inline Radio";
    this.Options.ClassName="rednaoinlineradios";
    this.Options.Options=new Array('Option 1','Option 2');

}

InlineRadioElement.prototype=Object.create(FormElementBase.prototype);

InlineRadioElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));



}

InlineRadioElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">';

    var checked='checked="checked"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoRadio" >\
                    <input class="redNaoInputRadio" type="radio" name="'+this.GetPropertyName()+'"  value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+checked+'/>'+this.Options.Options[i]+'\
                </label>';

        checked="";

    }

    html+='</div>';
    return html;
}

InlineRadioElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoRadio='padding-top:5px;display:inline-block;padding-right:20px;';
    this.Options.Styles.redNaoInputRadio='float:left;padding-right:20px;margin-right:5px;';
}


InlineRadioElement.prototype.GetValueString=function()
{

    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery.trim(rnJQuery('#'+this.Id+ ' .redNaoInputRadio:checked').parent().text()));
}


/*************************************************************************************Multiple Checkbox Element ***************************************************************************************************/

function MultipleCheckBoxElement()
{
    FormElementBase.call(this);
    this.Title="Multiple Checkboxes";

    this.Options.Label="Multiple Checkbox";
    this.Options.ClassName="rednaomultiplecheckboxes";
    this.Options.Options=new Array('Check 1','Check 2','Check 3');

}

MultipleCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

MultipleCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));



}

MultipleCheckBoxElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">';

    var checked='checked=checked';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoCheckBox" for="radios-0">\
                    <input type="checkbox" class="redNaoInputCheckBox" name="'+this.GetPropertyName()+'"  value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+checked+'/>'+this.Options.Options[i]+'\
                </label>';

        checked="";

    }

    html+='</div>';
    return html;
}



MultipleCheckBoxElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoCheckBox='padding-top:5px;padding-left: 20px;display: block;line-height: 18px';
    this.Options.Styles.redNaoInputCheckBox='float: left;margin-left: -20px;width:auto;'
}



MultipleCheckBoxElement.prototype.GetValueString=function()
{
    var valueString="";
    var me=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputCheckBox:checked').each(function()
    {
        valueString+=','+encodeURI(rnJQuery.trim(rnJQuery(this).parent().text()));
    })
    if(valueString.length>0)
        return encodeURI(me.Options.Label)+'='+valueString.substring(1);
    return '';

}
/*************************************************************************************Inline Checkbox Element ***************************************************************************************************/

function InlineCheckboxElement()
{
    FormElementBase.call(this);
    this.Title="Inline Checkboxes";

    this.Options.Label="Inline Checkbox";
    this.Options.ClassName="rednaoinlinecheckboxes";
    this.Options.Options=new Array('1','2','3','4');

}

InlineCheckboxElement.prototype=Object.create(FormElementBase.prototype);

InlineCheckboxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));



}

InlineCheckboxElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">';

    var checked='checked=checked';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoCheckBox" >\
                    <input  class="redNaoInputCheckBox" type="checkbox" name="'+this.GetPropertyName()+'"  value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+checked+'/>'+this.Options.Options[i]+'\
                </label>';

        checked="";

    }

    html+='</div>';
    return html;
}


InlineCheckboxElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoCheckBox='padding-top:5px;display:inline-block;padding-right:20px;';
    this.Options.Styles.redNaoInputCheckBox='float:left;padding-right:20px;margin-right:5px;';
}

InlineCheckboxElement.prototype.GetValueString=function()
{
    var valueString="";
    var me=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputCheckBox:checked').each(function()
    {
        valueString+=','+encodeURI(rnJQuery.trim(rnJQuery(this).parent().text()));
    })
    if(valueString.length>0)
        return encodeURI(me.Options.Label)+'='+valueString.substring(1);
    return '';

}

/*************************************************************************************Select Basic Element ***************************************************************************************************/

function SelectBasicElement()
{
    FormElementBase.call(this);
    this.Title="Select Basic";

    this.Options.Label="Select Basic";
    this.Options.ClassName="rednaoselectbasic";
    this.Options.Options=new Array('Option 1','Option 2','Option 3','Option 4');

}

SelectBasicElement.prototype=Object.create(FormElementBase.prototype);

SelectBasicElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoSelect'}));



}

SelectBasicElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">\
        <select name="'+this.GetPropertyName()+'" class="redNaoSelect">';

    var selected='selected="selected"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<option   value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+selected+'>'+this.Options.Options[i]+'</opton>'

        selected="";

    }
    html+='</select></div>';
    return html;
}


SelectBasicElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoSelect='width:auto;border: 1px solid #ccc;height:30px;line-height:30px;padding:4px 6px;';
}

SelectBasicElement.prototype.GetValueString=function()
{
    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected').text());
}





/*************************************************************************************Select Multiple Element ***************************************************************************************************/

function SelectMultipleElement()
{
    FormElementBase.call(this);
    this.Title="Select Multiple Element";

    this.Options.Label="Select Multiple Element";
    this.Options.ClassName="rednaoselectmultiple";
    this.Options.Options=new Array('Option 1','Option 2','Option 3','Option 4');

}

SelectMultipleElement.prototype=Object.create(FormElementBase.prototype);

SelectMultipleElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this.Options,"Options","Options",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"width","Width",{type:'style',class:'redNaoSelect'}));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"height","Height",{type:'style',class:'redNaoSelect'}));



}

SelectMultipleElement.prototype.GenerateInlineElement=function()
{

    var html=  '<label class="rednao_control_label">'+this.Options.Label+'</label>\
        <div class="redNaoControls">\
        <select name="'+this.GetPropertyName()+'" class="redNaoSelect" multiple="multiple">';

    var selected='selected="selected"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<option   value="'+RedNaoFormElementEscape(this.Options.Options[i])+'" '+selected+'>'+this.Options.Options[i]+'</opton>'

        selected="";

    }
    html+='</select></div>';
    return html;
}


SelectMultipleElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoSelect='width:auto;border: 1px solid #ccc;line-height:30px;padding:4px 6px;height:60px;';
}


SelectMultipleElement.prototype.GetValueString=function()
{
    var valueString="";
    var me=this;
    rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected').each(function()
    {
        valueString+=','+encodeURI(rnJQuery.trim(rnJQuery(this).text()));
    })
    if(valueString.length>0)
        return encodeURI(me.Options.Label)+'='+valueString.substring(1);
    return '';

}

/*************************************************************************************Donation Button***************************************************************************************************/



function DonationButtonElement()
{
    FormElementBase.call(this);
    this.Title="Donation Button";

    this.Options.Label="Donation Button";
    this.Options.ClassName="rednaodonationbutton";


}

DonationButtonElement.prototype=Object.create(FormElementBase.prototype);

DonationButtonElement.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this.Options.Styles,"margin-left","Spacing",{type:'style',class:'redNaoDonationButton'}));
}

DonationButtonElement.prototype.GenerateInlineElement=function()
{
    return '<div class="redNaoControls"><input type="image" class="redNaoDonationButton" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></div>';
}

DonationButtonElement.prototype.GenerateDefaultStyle=function()
{
    this.Options.Styles.redNaoDonationButton='margin-left:0px;';
}

DonationButtonElement.prototype.GetValueString=function()
{
    return '';

}