# Angular Signature Field 

This project implements a signature field, primarily for use in mobile apps.
It is implemented as an Angular directive and uses an HTML canvas element internally.  
Canvas resizing is handled in the directive to take care of orientation changes. 

## Getting Started

Use Bower to install the directive: 
```
bower install angular-signature-field
``` 

Import the module in your `index.html`. For Angular this means adding: 
```
<script src="bower_components/angular-signature-field/angular_signature_field.js"></script> 
```

For Ionic you would add: 
```
<script src="lib/angular-signature-field/angular_signature_field.js"></script>
```

## Use

The important directive is `signatureField`.
It can be used like this: 

```
<signature-field functions="signatureFunctions"></signature-field>
```

By passing an empty object from the controller `$scope` to `functions`, the directive can export two functions to be used in the controller: 

* `clear()` will clear the signature field. 
* `toDataURL()` will return a data URL containing the current image. It will pass-through arguments for [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).

## Demos

* [Plain Angular](https://github.com/jpkraemer/angularSignatureField-Angular-Example)
* [Ionic](https://github.com/jpkraemer/angularSignatureField-Ionic-Example)

## Known issues
The canvas is currently deleted after size changes. Since there is no good way to place the existing signature in a new canvas with different dimensions
without either distorting it or scaling it down, we kept it this way. 
