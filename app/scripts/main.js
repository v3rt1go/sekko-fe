/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  $(() => {
    // Scroll to top arrow
    $("#toTop").scrollToTop();

    /* Animation */
    // Extend jQuery with a function that will only trigger an animation if the previous one finished
    $.fn.extend({
      animateCss: function(animationName) {
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
        });
      }
    });

    // Scroll effects for menu
    $('.menuLink').click(function(event) {
      var target = ($(this).attr('rel'));
      if (target.length) {
        event.preventDefault();
        $('html, body').scrollTo($(target), 1000);
      }
    });

    // Elements
    const banner = {
      cta: $('.ctaButton')
    };
    const wrapper = {
      one: $('#one'),
      oneImage: $('#one .inner .image'),
      oneContent: $('#one .inner .content'),
      two: $('#two'),
      twoImage: $('#two .inner .image'),
      twoContent: $('#two .inner .content'),
      three: $('#three'),
      threeImage: $('#three .inner .image'),
      threeContent: $('#three .inner .content')
    };
    const footer = {
      form: $('#contactForm'),
      successMessage: $('#footer .success'),
      errorMessage: $('#footer .error'),
      year: $('.currYear'),
      submitButton: $('.actions li input[type="submit"]'),
      copyright: $('.copyright')
    };


    banner.cta.animateCss("delayed swing");

    /* Make sure animation runs only once */
    let oneRan, twoRan, threeRan = false;
    wrapper.one.scrollex({
      enter: () => {
        if (!oneRan) {
          wrapper.oneImage.animateCss("fadeInUpBig");
          wrapper.oneContent.animateCss("fadeInLeftBig");
          wrapper.oneImage.removeClass("hidden");
          wrapper.oneContent.removeClass("hidden");
          oneRan = true;
        }
      }
    });
    wrapper.two.scrollex({
      enter: () => {
        if (!twoRan) {
          wrapper.twoImage.animateCss("fadeInUpBig");
          wrapper.twoContent.animateCss("fadeInRightBig");
          wrapper.twoImage.removeClass("hidden");
          wrapper.twoContent.removeClass("hidden");
          twoRan = true;
        }
      }
    });
    wrapper.three.scrollex({
      enter: () => {
        if (!threeRan) {
          wrapper.threeImage.animateCss("fadeInUpBig");
          wrapper.threeContent.animateCss("fadeInLeftBig");
          wrapper.threeImage.removeClass("hidden");
          wrapper.threeContent.removeClass("hidden");
          threeRan = true;
        }
      }
    });

    footer.copyright.scrollex({
      enter: () => {
        footer.submitButton.animateCss("swing");
      }
    });


    /* Contact form */
    footer.form.submit((e) => {
      e.preventDefault();
      console.log('form submitted');

      let values = {};
      $.each(footer.form.serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });

      $.ajax({
        url: "https://formspree.io/salut@sekko.ro",
        method: "POST",
        data: values,
        dataType: "json"
      }).done(() => {
        footer.successMessage.show();
      }).fail(() => {
        footer.errorMessage.show();
      }).always(() => {
        footer.form.addClass('hidden');
      });
    });


    /* Miscellaneous */
    footer.year.text(new Date().getFullYear());
  });

})();
