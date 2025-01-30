/**
 * Name: Exenreco Bell
 *
 * Date: January 24, 2025
 *
 * File: template.js
 *
 * Description: Handles creating html page templates
 */

"use strict";

/**
 * # TEMPLATE (function)
 *
 * Handles generating a string that resembles an HTML document.
 *
 * @param {string} siteTitle - The title of the site, allows template to include site name in title tag
 *
 * @param {object} options - {
 *
 *  ## Allows users to configure the template.
 *
 *  examples:
 *
 *  ### options['html5'] - Adding html lang attribute:
 *
 *    - Enable html5 - [bool] options.html5 = true [support html5] | false [no html5 support]
 *
 *
 *  ### options['page'] ( object ) - Add header > title:
 *
 *    - [include site name in title ] - [bool] options.page.hasSiteTitle = true [show] | false [hide]
 *
 *    - [set document title]  - [string] - options.page['title'] = 'your title' | 'un-title' [default]
 *
 *
 *
 *  ### options['meta'] (object | array of objects) - Add meta tags:
 *
 *    - [adding a single tag] - [object] options.meta = { attribute-name: 'attribute-value', ... }
 *
 *    - [adding multiple tag] - [array] options.meta = [ { attribute-name: 'attribute-value', ... }, ... ]
 *
 *
 *  ### options['styles'] (object | array of objects)  - Add Style tags:
 *
 *    - [adding a single tag] - [object] options.styles = { atts:{ attribute-name: 'attribute-value', ... }, content: 'string' }
 *
 *    - [adding multiple tag] - [array] options.styles = [ { atts:{ attribute-name: 'attribute-value', ... }, content: 'string' }, ... ]
 *
 *
 *  ### options['scripts'] (object | array of objects) - Add Script tags:
 *
 *    - [adding a single tag] - [object] options.scripts = { atts:{ attribute-name: 'attribute-value', ... }, content: 'string' }
 *
 *    - [adding multiple tag] - [array] options.scripts = [ { atts:{ attribute-name: 'attribute-value', ... }, content: 'string' }, ... ]
 *
 *
 * ### options['body'] ( object) - Add body tag attributes and content:
 *
 *    - [adding attributes] - [object] options.body.atts = { attribute-name: 'attribute-value', ... }
 *
 *    - [adding body content] - [string] options.body.content = 'content'
 *
 * }
 *
 * @returns {string|void} - When valid returns an object, otherwise an error is thrown.
 *
 * @dev Exenreco Bell
 *
 * @date January 24, 2025
 *
 * @since version: 0.0.1
 */

const Template = ( siteTitle = 'In-N-Out-Books', options = {} ) => {

  // Notify dev in console that a site name is required, when site title is invalid

  if( ! siteTitle || ! siteTitle instanceof String ) throw new Error(`
    When creating a site page, the first param must be an
    a none empty string, a "[${typeof(siteTitle)}] - ${siteTitle}" was given!
  `);


  // Notify dev that options parameter must be an object

  if( ! options || ! options instanceof Object ) throw new Error(`
    When creating a site page, the second param must be an
    object, a "${typeof(options)}" was given!
  `);


  // collection of dev defined html contents

  let mapHtml = new Map();

  // Set default HTML5 enabled
  mapHtml.set('html5', true),


  // Set default language attribute for HTML tag (English)

  mapHtml.set('lang', 'en'),


  // Set default page title

  mapHtml.set('page', {
    title: `${siteTitle} | Un-titled`,
    hasSiteTitle: true
  }),


  // Initialize empty meta, body, styles, and scripts collections

  mapHtml.set('meta', []),
  mapHtml.set('body', {}),
  mapHtml.set('styles', [] ),
  mapHtml.set('scripts', [] );


  // Process options for customizing HTML properties

  if( options && 'html5' in options && options.html5 instanceof Boolean) {
    mapHtml.set('html5', options.html5);
  }


  // Process page lang options

  if( options && 'lang' in options && options.lang instanceof String ) {
    mapHtml.set('lang', `${options.lang}`);
  }


  // Process page title options

  if( options && 'page' in options && options.page instanceof Object ) {
    if( 'hasSiteTitle' in options.page && options.page.hasSiteTitle instanceof Boolean)
    {
      mapHtml.set('page', {
        ...mapHtml.get('page'),
        hasSiteTitle: options.page.hasSiteTitle
      })
    }

    if( 'title' in options.page && options.page.title instanceof String)
    {
      let hasSiteTitle = mapHtml.get('page')['hasSiteTitle']
      if( hasSiteTitle && hasSiteTitle === false ) {
        mapHtml.set('page', {
          ...mapHtml.get('page'),
          title: `${options.page.title}`,
        })
      } else {
        mapHtml.set('page', {
          ...mapHtml.get('page'),
          title: `${siteTitle} | ${options.page.title}`,
        })
      }
    }
  }


  // Process meta tags

  if( options && 'meta' in options && options.meta instanceof Array) {
    options.meta.forEach(meta => {
      if( meta && meta instanceof Object) mapHtml.set('meta',[
        ...mapHtml.get('meta'),
        {...meta}
      ]);
    });

  } else if( options && 'meta' in options && options.meta instanceof Object) {
    mapHtml.set('meta', [
      ...mapHtml.get('meta'),
      {...options.meta}
    ]);
  }


  // Process body content and attributes

  if(options && 'body' in options && options.body instanceof Object) {
    mapHtml.set('body', {
      ...mapHtml.get('body'),
      'atts': ( 'atts' in options.body && options.body.atts instanceof Object) ? options.body.atts : {},
      'content': ( 'content' in options.body ) ? options.body.content : ''
    });
  } else if(options && 'body' in options && options.body) {
    mapHtml.set('body', {
      ...mapHtml.get('body'),
      'content': `${options.body}`
    });
  }


  // Process styles array or object

  if( options && 'styles' in options && options.styles instanceof Array ) {
    options.styles.forEach(style => {
      if( style instanceof Object ) mapHtml.set('styles',[
        ...mapHtml.get('styles'),
        {
          'atts': ('atts' in style && style.atts instanceof Object) ? style.atts : {},
          'content': ('content' in style) ? style.content : ''
        }
      ]);
    });
  } else if( options && 'styles' in options && options.styles instanceof Object) {
    mapHtml.set('styles', [
      ...mapHtml.get('styles'),
      {
        'atts': ('atts' in options.styles && options.styles.atts instanceof Object) ? options.styles.atts : {},
        'content': ('content' in options.styles) ? options.styles.content : ''
      }
    ]);
  }


  // Process scripts array or object

  if( options && 'scripts' in options && options.scripts instanceof Array) {
    options.scripts.forEach(script => {
      if( script instanceof Object) mapHtml.set('scripts', [
        ...mapHtml.get('scripts'),
        {
          'atts': ('atts' in script && script.atts instanceof Object) ? script.atts : {},
          'content': ('content' in script) ? script.content : ''
        }
      ]);
    });
  } else if( options && 'scripts' in options && options.scripts instanceof Object ) {
    mapHtml.set('scripts', [
      ...mapHtml.get('scripts'),
      {
        'atts': ('atts' in options.scripts && options.scripts.atts instanceof Object) ? options.scripts.atts : {},
        'content': ('content' in options.scripts) ? options.scripts.content : ''
      }
    ]);
  }

  let
  html,
  metaTags        = '',
  styleTags       = '',
  scriptTags      = '',
  bodyAttributes  = '';


  // Generate meta tags

  mapHtml.get('meta').forEach(meta => {
    metaTags += '<meta ';
    for( const key in meta ) {
      if( meta.hasOwnProperty(key) ) metaTags += `${key}="${meta[key]}" `;
    }
    metaTags += '>';
  });


  // Generate style tags

  mapHtml.get('styles').forEach(style => {
    styleTags += ( style.atts.hasOwnProperty('href') && style.atts.href !== '')
    ? // use link style sheet
      '<link '
    : // uses style tag
      '<style '
    ;

    for( const key in style['atts']) {
      ( style.atts.hasOwnProperty(key) )
      ? styleTags += `${key}="${style.atts[key]}" `
      : ''
    }

    styleTags += ( style.atts.hasOwnProperty('href') && style.atts.href !== '')
    ? // close link tag
      `>`
    : // close style tag
      `>${style.content}</style>`;
  });


  // Generate script tags

  mapHtml.get('scripts').forEach(script => {
    scriptTags += '<script ';
    for( const key in script['atts']) {
      if( script.atts.hasOwnProperty(key) ) {
        ( script[key] === '' )
        ? scriptTags += `${key} `
        : scriptTags += `${key}="${script.atts[key]}" `;
      }
    }
    scriptTags += `>${script.content}</script>`;
  });


  // Generate body tags attributes

  for( const key in mapHtml.get('body').atts) {
    if( mapHtml.get('body').atts.hasOwnProperty(key) ) {
      bodyAttributes += `${key}="${mapHtml.get('body').atts[key]}" `
    }
  };

  // Generate HTML document

  html = `${ (mapHtml.get('html5') === true) ? '<!DOCTYPE html>' : '' }
    <html lang="${mapHtml.get('lang')}">
      <head>
          ${metaTags}
          <title>${mapHtml.get('page').title}</title>
          ${styleTags}
          ${scriptTags}
      </head>
      <body ${bodyAttributes} >
        ${mapHtml.get('body').content}
      </body>
    </html>
  `;

  // Return page as string

  return {
    // returns the template as a string
    get_template: ()=>html,

    // return the given options
    get_options: () => options,

    //log the generated template
    log_template: ()=>console.log(html)
  };
};

// export template module
export default Template;