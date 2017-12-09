# scroll-balanced

jQuery plugin for balanced scroll content

### [Demo](https://thofik93.github.io/scroll-balanced/)

## How to use:

Install via NPM:

```html
npm install scroll-balanced
```

Make sure to include jQuery in your page:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```

Include **jQuery Scroll-Balanced:**

```html
<script src="js/scroll-balanced.js"></script>
```

Include **jQuery Scroll-Balanced** styles

```html
<link rel="stylesheet" href="css/scroll-balanced.css">
```



All you must to do just create markup like below, and put your content left in element with class (scroll-balanced-left), and right in element with class (scroll-balanced-right)


```html
<div class="row-scroll-balanced" data-scroll-balanced>
  <div class="column-scroll-balanced scroll-balanced-left">
	
		<div class="scroll-balanced-item">
			<!--.put your content here-->
		</div>

  </div>

  <div class="column-scroll-balanced scroll-balanced-right">

	  <div class="scroll-balanced-item">
			<!--.put your content here-->
	  </div>

  </div>
</div>
```

