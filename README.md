# jsmUrlToForm
Converts links to get and post forms

## Usage
__Example__

```
<script src="jsm-url-to-form.js"></script>

      <script>
      window.onload=function(){
          jsmUrlToForm.init();
      }
      </script>

```
__Custom__

```
<script src="jsm-url-to-form.js"></script>

      <script>
      window.onload=function(){
               jsmUrlToForm.init({
                        formName: 'jsmToForm', //name form <optional> 
                        formMethod: 'get', //method form default <optional> 
                        tokenName: 'token', //Input field containing the token  <optional> 
                        tokenVal:'default', //token value <optional> 
                        esclude:['product/update','/contact','etc/etc'], //excludes links that contain the corresponding statement <optional> 
                        escludeExt:['.jpg','.png','.gif'] //excludes links that contain the corresponding statement <optional> 
                    });
                }
      }
      </script>

```

__Custom To be used manually__
##
__html__
```
<a href="javascript:{jsmUrlToForm.attachForm('/index.php?route=product/product&amp;product_id=70')}"> Prodotto 1</a>

<a href="javascript:{jsmUrlToForm.attachForm('/index.php?route=product/product&amp;product_id=71')}"> Prodotto 2</a>

```
__jsmUrlToForm Methods__

```
If we need to handle a security parameter such as the token
Then we can either manually or automatically place the form on the token parameter page so that we can safely handle our requests

<form name="jsmToForm" action="#" method="post" style="display: none;">
<input type="hidden" name="Mytoken" id="Mytoken" value="myValueToken">
</form>

 <script>
      window.onload=function(){
               jsmUrlToForm.init({
                        formName: 'jsmToForm', //name form <optional> 
                        tokenName: 'Mytoken', //Input field containing the token  <optional> 
                    });
                }
      }
      </script>

jsmUrlToForm.attachForm('url')
jsmUrlToForm.attachForm('url',<post - get>)
<Sends the call as form request both get and post>

jsmUrlToForm.getToken() 
<Return token>

jsmUrlToForm.setToken('token')  
<Set the javascript side token
For javascript operations>


jsmUrlToForm.verifyToken('url') 
<Verifies whether the token parameter exists in the string if it does not exist inserts it
Returns the string with the token parameter>


jsmUrlToForm.get() 
<context form>

```
