declare module "*/lib/enonic/react4xp" {
  namespace react4xpLib {
    interface React4xpLibrary {
      new <Props extends object = object>(entry: string): React4xp<Props>;

      /**
       * All-in-one shorthand function for a lot of use cases. Covers both client- and serverside rendering.
       */
      render<Props extends object = object>(
        /**
         * Reference to an entry: the react component to be rendered. JsxPath reference
         * - or if the entry is a JSX file with the same name in the same folder as the controller,
         * you can use a portal.getComponent() object here. Corresponds to the template argument in thymeleaf.render.
         */
        entry: string | import("/lib/xp/portal").Component<unknown>,
        /**
         * Data model passed into the react component.
         * JS object must be serializable (no functions can be passed).
         * Corresponds to the model argument in thymeleaf.render.
         */
        props?: Props,
        /**
         * Include to detect the rendering mode inside/outside Content Studio: inside Content Studio there should be only
         * a static serverside-rendering, no browser react activation (or client-side rendering),
         * only returning get an HTML visualization with the initial props.
         * Special case: if request is not an object but omitted/falsy, page-contributions rendering is completely skipped.
         * In this case, the options argument (below) is still valid: any added body there will still serve as a container
         * for the rendered output from this call, and any pageContributions inside options are still added and returned.
         */
        request?: XP.Request | null,
        /**
         * Additional options to control the rendering. All of them are optional within this object:
         */
        options?: RenderOptions
      ): RenderResponse;
    }

    interface RenderOptions {
      /**
       * ID of the component, targeting the ID of an element in body (below): react will render into that container element.
       * Should be a unique ID within the entire HTML document.
       *
       * If no matching element ID is found in body, this sets the ID of a generated element in the HTML output.
       * If id is missing, a unique ID is generated, either random or generated from the content.
       */
      id?: string;

      /**
       * HTML to serve as container for the react content. Can be a hardcoded string, come from a thymeleaf/mustache/XSLT
       * render, or any source. When server-side rendering, the rendered output will be inserted into the matching-id
       * element inside here (replacing whatever was already in that element), and everything (container body with rendered
       * content in it) is returned as one HTML string. When client-side rendering, this insertion happens in the browser.
       *
       * If no body is supplied, an empty <div> element with an ID matching id is generated and used as container.
       *
       * If a body is supplied but it doesn’t contain any element with a matching id, an extra matching-id <div> element
       * will be generated and inserted into body - as a child of the root element of body and after any other content
       * that’s already there.
       */
      body?: string;

      /**
       * If you already have some page contributions you want to add to the output of this rendering, add them here.
       * These added page contributions will be added before the ones that will be rendered (within each section headBegin,
       * bodyEnd etc).
       */
      pageContributions?: XP.PageContributions;

      /**
       * Switch between clientside and servierside rendering, on this particular rendering. Other renderings are not
       * affected, even within the same controller or using the same entry more than once.
       *
       * If false / falsy or omitted, you get serverside rendering and the returned object will contain an HTML
       * representation of the react component with the initial props, and page contributions will make the client call
       * .hydrate.
       *
       * If true / truthy, the server-side rendering is skipped for this particular rendering. The client will call .render.
       *
       * This only applies in live mode and previews: inside edit or browse modes in Content Studio, you still only get a
       * static server-side rendered representation).
       */
      clientRender?: boolean;
    }

    interface React4xp<Props extends object = object> {
      /**
       * Target id of the HTML element the entry will be rendered into (if it’s been set yet - see setId and uniqueId below).
       * Also identifies the object.
       */
      react4xpId: string;

      /**
       * jsxPath to the entry.
       */
      jsxPath: string;

      /**
       * `props` for the entry’s initial rendering. At the time of rendering, an attribute react4xpId is added to the props,
       * allowing each entry to access its own unique ID at runtime.
       */
      props: Props;

      /**
       * Similar to React4xp.render above, but renderBody in itself only renders a static HTML output.
       */
      renderBody(options?: RenderBodyOptions): string;

      /**
       * Similar to React4xp.render above, but only renders the page contributions needed to run and activate the react
       * component in the browser:
       *
       * - references to the entry’s own asset,
       * - dependency assets,
       * - and the react-activating trigger call in the browser (.render or .hydrate, depending on the clientRender and request options).
       *
       * Renders based on the state of the data object at the time of rendering.
       */
      renderPageContributions(options?: RenderPageContributionsParams): XP.PageContributions;

      /**
       * Sets an ID - directly and literally, so uniqueness is up to you. This ID both identifies this react4xp object
       * (aka. react4xpId), and crucially, points React to an HTML element (in the body param, during render or renderBody
       * later) which is the target container for rendering the entry into. Phew.
       */
      setId(id: string): React4xp;

      /**
       * If you for some reason need to override the JsxPath that was set (or inferred from the component object) in the
       * constructor.
       */
      setJsxPath(path: string): React4xp;

      /**
       * Sets props for the entry.
       */
      setProps(props: Props): React4xp;

      /**
       * Enforces a unique ID, either by itself or after running .setId(). If the object already has an ID (react4xpId),
       * a random string will be added to it. If not, the ID will just be the random string.
       */
      uniqueId(): React4xp;
    }

    interface RenderResponse {
      /**
       * HTML output.
       *
       * The root of this HTML is always a surrounding container HTML that will have a matching-ID target element in it
       * somewhere (an element matching the ID of the clientside call to `.render` or `.hydrate`: that ID is `options.id` if
       * that was set, or a generated unique one if not). This surrounding structure is `options.body`, unchanged if that
       * already contained a matching-ID element, or with a new target element generated and inserted at the end if it
       * didn’t have one. If there is no options.body, the surrounding container is just a generated target `<div>` element.
       *
       * Inside that matching-ID element, there will be a serverside rendering of the entry (with the initial props from
       * `options.props) if options.clientRender is falsy.
       */
      body: string;

      /**
       * Regular XP page contributions. Includes everything the browser needs to activate (or client-side render) the react
       * component: script tags with urls to auto-compiled assets for the entry and its dependencies, a client-side react4xp
       * wrapper asset and an activating client-wrapper call. Urls point to react4xp’s own optimized asset services.
       * Also included before this, are any input `options.pageContributions`.
       */
      pageContributions: XP.PageContributions;
    }

    interface RenderBodyOptions {
      /**
       * Same as the options.body in React4xp.render above.
       */
      body?: string;

      /**
       * Switch between clientside and serverside rendering, on this particular rendering.
       */
      clientRender?: boolean;

      /**
       * Including this here (and in the corresponding renderPageContributions call) is the easiest way to handle
       * view-context dependent behavior.
       *
       * Without this, clientRender may be active in Content Studio preview rendering, leading to possibly undesired results.
       */
      request?: XP.Request;
    }

    interface RenderPageContributionsParams {
      /**
       * If you already have some page contributions you want to add to the output of this rendering, add them here.
       * These added page contributions will be added before the ones that will be rendered
       * (within each section headBegin, bodyEnd etc).
       */
      pageContributions?: XP.PageContributions;

      /**
       * Switch between clientside and servierside rendering, on this particular rendering.
       */
      clientRender?: boolean;

      /**
       * Including this here (and in the corresponding renderPageContributions call) is the easiest way to handle
       * view-context dependent behavior. Without this, clientRender may be active in Content Studio preview rendering,
       * leading to possibly undesired results.
       *
       * Other renderings are not affected, even from the same data object (so you usually want to make sure a different
       * rendering from the same data object uses the same mode).
       */
      request?: XP.Request;
    }
  }

  const react4xpLib: react4xpLib.React4xpLibrary;
  export = react4xpLib;
}
