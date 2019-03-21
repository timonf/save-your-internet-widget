// Loading template by using raw-loader
import html from './templates/widget.html';

// Available locales
import * as locales_de from "./lang/de.json";
import * as locales_en from "./lang/en.json";
//import * as locales_fr from "./lang/fr.json";
import * as locales_nl from "./lang/nl.json";
import * as locales_el from "./lang/el.json";

const locales = {
  'de': locales_de.default,
  'en': locales_en.default,
  //'fr': locales_fr.default,
  'nl': locales_nl.default,
  'el': locales_el.default
};

// Default configuration
const config = {
  blackOutDay: '2019-03-21',
  hideOnReload: false,
  language: 'en'
};

// Merges custom config into our config
if (typeof SAVE_YOUR_INTERNET_CONFIG !== undefined) {
    Object.assign(config, SAVE_YOUR_INTERNET_CONFIG);
}

// Returns template by given language
let getTemplate = () => {
    const translations = Object.entries(locales[config.language]);

    let template = html;
    
    for (let [key, value] of translations) {
      let templateKey = new RegExp('{{' + key + '}}', 'g');
      template = template.replace(templateKey, value);
    }
    
    return template;    
}

let showWidget = () => {
    let body = document.getElementsByTagName('body')[0]; 
    body.insertAdjacentHTML('beforeend', getTemplate());

    if (config.hideOnReload === true) {
        localStorage.setItem('syi.seen', 'yes');
    }
}

let alreadySeen = () => {
    if (config.hideOnReload === true && localStorage.getItem('syi.seen') === 'yes') {
        return true;
    }

    return false;
}

let isBlackOutDay = () => {
    const now = new Date();

    return now.toISOString().substr(0, 10) === config.blackOutDay;
}

// Main logic
if (window.location.hash === '#showsaveyourinternet') {
    showWidget();
} else if (!alreadySeen() && isBlackOutDay()) {
    showWidget();
} else {
    console.log('No reason to show "Save your internet" widget.');
}
