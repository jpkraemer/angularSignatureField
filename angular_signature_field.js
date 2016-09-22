
angular.module('jpkraemer.angularSignatureField').directive("signatureField", function ($document, $window) {

  //Utility functions
  var Point = function (x,y) {
    this.x = x; 
    this.y = y;
  }

  function link($scope, $element, $attr) {
    function pointFromMouseEvent(event) {
      var rect = $canvas[0].getBoundingClientRect();
      return new Point(event.clientX - rect.left, event.clientY - rect.top); 
    }

    var pointFromTouch = pointFromMouseEvent;

    function startDraw(point) { 
      context.moveTo(point.x, point.y); 

      isMouseDown = true;
    }

    function moveDraw(point) {
      if (isMouseDown) { 
        context.lineTo(point.x, point.y);
        context.stroke();
      }
    }

    function stopDraw() { 
      isMouseDown = false;
    }

    function elementWidth() {
      return $element[0].offsetWidth; 
    }

    function elementHeight() {
      return $element[0].offsetHeight; 
    }

    function resizeCanvas() {
      $canvas.attr("width", elementWidth());
      $canvas.attr("height", elementHeight());
    }

    //Setup
    var $canvas = angular.element("<canvas></canvas>");
    $element.append($canvas);
    var context = $canvas[0].getContext('2d');
    var isMouseDown = false;

    //Resize Callbacks
    $scope.$watch(
      function () { 
        return { width: elementWidth(), height: elementHeight() }; 
      },
      function () {
        resizeCanvas();
      }, 
      true);
    
    angular.element($window).bind('resize', function () { 
      $scope.$digest(); 
    });

    //Event Callbacks
    $canvas.on("mousedown", function(event) { startDraw(pointFromMouseEvent(event)); event.stopPropagation(); }); 
    $canvas.on("mousemove", function(event) { moveDraw(pointFromMouseEvent(event)); event.stopPropagation(); });
    $document.on("mouseup", stopDraw);

    $canvas.on("touchstart", function(event) { 
      if (event.targetTouches.length == 1) {
        startDraw(pointFromTouch(event.changedTouches[0]));
        event.preventDefault(); 
      } 
    });
    $canvas.on("touchmove", function(event) { 
      if (event.targetTouches.length == 1) {
        moveDraw(pointFromTouch(event.changedTouches[0])); 
        event.preventDefault();
      } 
    });
    $document.on("touchend", stopDraw);

    //functions
    $scope.internalFunctions = $scope.functions || {};
    $scope.internalFunctions.toDataURL = function() { return $canvas[0].toDataURL.apply($canvas[0], arguments); };
    $scope.internalFunctions.clear = function() { resizeCanvas(); }
  }

  return {
    restrict: 'E',
    scope: {
      functions: '='      
    },
    link: link
  }
})
