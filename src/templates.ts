import path = require('path');
import Handlebars = require('handlebars');
import moment = require('moment');
import fs = require('fs');

let templates: HandlebarsTemplates = {};

export function resetTemplates() {
  templates = {};
  loadTemplates();
}

export function loadTemplates() {
  let templatesPath = path.join(__dirname, '../templates');
  let handlebars = Handlebars.create();

  handlebars.registerHelper('moment', function(dateString: string, format: string, options: any) {
    let date;

    if (arguments.length === 2) {
      format = dateString;
      date = moment();
    } else {
      date = moment(dateString);
    }

    return date.format(format);
  });

  fs.readdirSync(templatesPath)
    .map(fileName => {
      return {
        name: fileName,
        data: fs.readFileSync(`templates/${fileName}`).toString()
      }
    })
    .forEach(file => {
      let templateName = path.basename(file.name, '.hbs');
      if (templateName.charAt(0) === '_') {
        handlebars.registerPartial(templateName.slice(1), file.data);
      } else {
        let template = handlebars.compile(file.data);
        templates[templateName] = template;
      }
    });

  return templates;
}
