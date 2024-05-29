import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About Us page" },
  { to: ROUTES.ADMIN_SPEECH, children: "Admin speech page" },
];
const loggedInLinks = [];
const bizLinks = [
  { to: ROUTES.CREATECARD, children: "Create page" } ,
  { to: ROUTES.MY_CARDS, children: "My cards page" },
];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
