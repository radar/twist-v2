import * as React from "react";

import { CurrentUserQuery } from "../graphql/types";

export type CurrentUserType = CurrentUserQuery["currentUser"];

export default React.createContext<CurrentUserType>(null);
