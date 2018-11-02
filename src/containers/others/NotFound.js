import React from "react";
import "./NotFound.css";

export default (initialState = {}) =>
  <div className="NotFound">
      <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    <h3>Sorry, page not found!</h3>
{/*dirty  initialState = "{user: { /"username/": "NodeSecurity", /"signature/": "as</script><script>alert('You have an XSS vulnerability!')</script>" } }"*/}
  </div>;