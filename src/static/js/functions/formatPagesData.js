import { error as errorLogger } from './logger';
import titleToSlug from './titleToSlug';
import lowerCaseFirstChar from './lowerCaseFirstChar';

export default function (homePageKey, pages) {

    let key;

    for (key in pages) {

        if (pages.hasOwnProperty(key)) {

            if (!!pages[key].exact) {
                pages[key].exact = !!pages[key].exact;
            }

            if (!!pages[key].title) {
                pages[key].title = "" + pages[key].title;
            }

            if (!!!pages[key].path) {

                if (key === homePageKey) {
                    pages[key].path = '/';
                } else {
                    if ("" !== pages[key].title) {
                        pages[key].path = '/' + titleToSlug(lowerCaseFirstChar(pages[key].title));
                    } else {
                        errorLogger("Invalid route path", pages[key]);
                    }
                }
            }
        }
    }

    return pages;
}