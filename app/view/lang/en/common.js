angular.module("languageService", [], ["$provide", function($provide) {    
    $provide.value("commonLanguage", {
        titlePage : "Share Things Share Life",
        titleWebPage : "Advertisement Web",
        labelBuy : "Buy",
        labelSell : "Sell",
        labelHome : "Home",
        labelLoginRegister : "Login/ Register",
        labelPostArticleFree : "Post Article Free",
        labelPostedArticles : "Posted Articles",
        labelProfile : "Profile",
        labelHistoryTransaction : "History Transaction",
        labelLogin : "Log in",
        labelLogout : "Log out",
        labelEmail : "Email",
        labelPhone : "Phone Number",
        labelContact : "Contact Details",
        labelAbout : "About The Personal Info",
        contentAbout : "Feel free to use these templates in both personal and commercial projects. We hope they come in handy and we’d love to see what you do with them :)",
        labelCustomerServices : "Customer Services",
        contentCustomerServices : "Center help users sell and buy things safely",
        labelHumanResource : "Human Resource",
        contentHumanResource : "Introduce Recruitment Traditional Blog",
        labelAuthor : "DungNV",
        labelCarrer : "Web Design & Development by DungNV",
        labelLicense : "© 2015, DungNV, All rights reserved"
    });
    $provide.value("homeLanguage", {
        dollarCurrency : "$",
    });
    $provide.value("loginLanguage", {
        labelSignin : "Sign in",
        labelForgotPassword : "Forgot password?",
        labelRememberMe : "Remember me",
        labelLoginWithFacebook : "Login with facebook",
        labelSignup : "Sign up here",
        labelCreateAccount : "Do not have an account!",
        labelEmail : "Email",
        labelPassword : "Password",
        labelName : "Name",
        labelBirthday : "Birthday",
        labelAddress : "Address",
        labelGender : "Gender",
        titleSignup : "Sign up",
    });
}]);
