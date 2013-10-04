Navigator 
------
Navigator is a simple way to create a series of sliding views that can be easily controlled with a series of javascript methods. The javascript is made lighter by relying on CSS3 for transitioning between each 'view'. I've found that this makes implementation highly customizable and understandable. However, this does have drawbacks. If you need to support older browsers, for example, this option may not be for you.

## Basic Usage
First off, you'll need to include the navigator css and js files in your project along with a recent copy of jQuery. ;)

To use navigator, all you need to do is define the series of views you want within a container object with the `navigation-controller` class. Only one of these views will be visible at a time and each need the `navigation-view` class. Like so:

```
<div id='my-nav-controller' class='navigation-controller'>
    <div class='navigation-view'>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper, lectus eget aliquam tincidunt, ligula lorem luctus diam, ac imperdiet leo sapien ac dui.
        </p>
    </div>
    <div class='navigation-view'>
        <p>
        Donec dignissim quis magna ac accumsan. Aenean ultrices eros a nisi mollis tincidunt. Donec sem nisl, elementum sit amet pharetra a, ultrices ac tellus. Curabitur laoreet felis at velit tristique consectetur quis at ante. Nunc vel odio in augue hendrerit commodo.
        </p>
    </div>
    <div class='navigation-view'>
        <p>
        In blandit ultrices elementum. Quisque consequat facilisis felis at fringilla. Fusce vitae lacus vulputate, tempus diam quis, fringilla neque.
        </p>
    </div>
</div>
```

Note that it is up to you to declare the size constraints of the object with the `navigation-controller` class. Each `navigation-view` within it will take up its full width and height and additional styling should be defined within their contents.

When you first see a navigator, only the first `navigation-view` within it will be visible. To step forward to the next `navigation-view`, simply select the object with the `navigation-controller` class using jQuery and call the `#stepForward` method on it, like so:

```
$('#my-nav-controller').stepForward();
```

Likewise, to step backwards, you will call the `#stepBackward` method.

```
$('#my-nav-controller').stepBackward();
```

Note that the above methods will not allow you to `#stepBackward` past the initial view or to `#stepForward` beyond the final view. There are three additional methods exposed to your `navigation-controller` objects that are intended to be used by you in order to update your own navigation UI accordingly:

```
$('#my-nav-controller').currentStep(); // Returns the index (beginning at 1) of the current visible view.
$('#my-nav-controller').isFirstStep(); // Are we on the first step?
$('#my-nav-controller').isLastStep();  // Are we on the final step?
```

*There is a working example of a navigator in this repo's index.html project.*
