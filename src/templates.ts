import * as path from 'path';
import Handlebars from 'handlebars';
import moment from 'moment';
import * as fs from 'fs';

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

  // Runtime options to allow accessing class getters/prototype properties
  const runtimeOptions = {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  };

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
        let compiledTemplate = handlebars.compile(file.data);
        // Wrap template to include runtime options for prototype access
        templates[templateName] = (context: any) => compiledTemplate(context, runtimeOptions);
      }
    });

  return templates;
}
