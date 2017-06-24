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
