import { verify } from 'jsonwebtoken';
import {ACCESS_TOKEN_SECRET}  from "../config.js";

export const checkJwt = (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;
  
    // Validate the token and retrieve its data.
    try {
        // Verify the payload fields
        let jwt = token.split(' ')[1];
        console.log ("Authorization: " + jwt);
        jwtPayload = verify(jwt, ACCESS_TOKEN_SECRET ,
        {
          complete: true,
          algorithms: ['HS256'],
          clockTolerance: 0,
          ignoreExpiration: false,
          ignoreNotBefore: false
      }
        );
        // Add the payload to the request so controllers may access it.
        req.token = jwtPayload;
    } catch (error) {
       console.log (error);
        res.status(401)
            .type('json')
            .send(JSON.stringify({ message: 'Missing or invalid token' }));
        return;
    }
  
    // Pass programmatic flow to the next middleware/controller.
    next();
  };