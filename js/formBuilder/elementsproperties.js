"use strict;"


/************************************************************************************* Manipulstors ***************************************************************************************************/
function RedNaoBasicManipulator()
{

}

RedNaoBasicManipulator.prototype.GetValue=function(propertiesObject,propertyName,additionalInformation)
{
    return propertiesObject[propertyName];
}

RedNaoBasicManipulator.prototype.SetValue=function(propertiesObject,propertyName,value,additionalInformation)
{
    propertiesObject[propertyName]=value;
}





function RedNaoStyleManipulator()
{

}

RedNaoStyleManipulator.prototype.GetValue=function(propertiesObject,propertyName,additionalInformation)
{
    var re = new RegExp(propertyName+":[^;]*;", "");
    var result=propertiesObject[additionalInformation.class].match(re);
    if(result.length>0)
    {
        var splittedResult=result[0].split(':');
        if(splittedResult.length==2)
            return splittedResult[1].replace(';','');
    }
}

RedNaoStyleManipulator.prototype.SetValue=function(propertiesObject,propertyName,value,additionalInformation)
{
    var classObject=propertiesObject[additionalInformation.class];
    var re = new RegExp(propertyName+":[^;]*;", "g");
    classObject=classObject.replace(re,'');
    classObject+=propertyName+":"+value+";";

    propertiesObject[additionalInformation.class]=classObject;
}

var RedNaoStyleManipulatorInstance=new RedNaoStyleManipulator();
var RedNaoBasicManipulatorInstance=new RedNaoBasicManipulator();

/************************************************************************************* Base  ***************************************************************************************************/

function ElementPropertiesBase(propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    if(additionalInformation=='basic')
        this.Manipulator=RedNaoBasicManipulatorInstance;

    else
        this.Manipulator=RedNaoStyleManipulatorInstance;
    this.AdditionalInformation=additionalInformation;
    this.PropertiesObject=propertiesObject;
    this.PropertyName=propertyName;
    this.PropertyTitle=propertyTitle;
    this.PropertyId="redNaoFormProperty"+this.PropertyName;

}

ElementPropertiesBase.prototype.CreateProperty=function(jQueryObject)
{
    jQueryObject.append(this.GenerateHtml());
}

ElementPropertiesBase.prototype.GenerateHtml=function()
{
    throw 'Abstract Method';
}

ElementPropertiesBase.prototype.GetPropertyCurrentValue=function()
{
    return this.Manipulator.GetValue(this.PropertiesObject,this.PropertyName,this.AdditionalInformation);
}

ElementPropertiesBase.prototype.UpdateProperty=function()
{
    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, rnJQuery("#"+this.PropertyId).val(),this.AdditionalInformation);

}


/************************************************************************************* Simple Text Property ***************************************************************************************************/


function SimpleTextProperty(propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

SimpleTextProperty.prototype=Object.create(ElementPropertiesBase.prototype);

SimpleTextProperty.prototype.GenerateHtml=function()
{
    return '<label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label>\
            <input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+this.GetPropertyCurrentValue()+'"/>'
}





/************************************************************************************* Check Box Property ***************************************************************************************************/



function CheckBoxProperty(propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

CheckBoxProperty.prototype=Object.create(ElementPropertiesBase.prototype);

CheckBoxProperty.prototype.GenerateHtml=function()
{
    return '<label class="checkbox control-group" style="display: block;">\
                <input type="checkbox" class="input-inline field" name="checked" id="'+this.PropertyId+'" '+(this.GetPropertyCurrentValue()=='y'? 'checked="checked"':'')+'/> '+this.PropertyTitle+'\
            </label>';
}

CheckBoxProperty.prototype.UpdateProperty=function()
{
    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, (rnJQuery("#"+this.PropertyId).is(':checked')?'y':'n'),this.AdditionalInformation);

}





/************************************************************************************* Array Property ***************************************************************************************************/



function ArrayProperty(propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

ArrayProperty.prototype=Object.create(ElementPropertiesBase.prototype);

ArrayProperty.prototype.GenerateHtml=function()
{
    var currentValues=this.GetPropertyCurrentValue();
    var valuesText="";
    for(var i=0;i<currentValues.length;i++)
    {
        valuesText+='\n'+currentValues[i];
    }

    if(valuesText.length>0)
        valuesText=valuesText.substr(1);

    return '<textarea class="field" data-type="textarea-split" style="min-height: 200px;width: 206px;" id="'+this.PropertyId+'">'+valuesText+'</textarea>';
}

ArrayProperty.prototype.UpdateProperty=function()
{
    var newValue=rnJQuery("#"+this.PropertyId).val();;




    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, newValue.split(/\r\n|\r|\n/g),this.AdditionalInformation);

}
