/**
* @app ReadMoreJS
* @desc Breaks the content of an element to the specified number of words
* @version 1.0.0
* @license The MIT License (MIT)
* @author George Raptis | http://georap.gr | Adrian Rodriguez
*/
export default class ReadMore {


    // We use destructuring to match properties on the object
    // passed into separate variables for character and actor
    constructor() {
    }


    /* ============================== */
    /*             HELPERS            */
    /* ============================== */
    static extendObj() {
        for (let i = 1, l = arguments.length; i < l; i++) {
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
                        arguments[0][key] = arguments[0][key] || {};
                        this.extendObj(arguments[0][key], arguments[i][key]);
                    } else {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
        }
        return arguments[0];
    }

    /**
     * 
     * 
     * @param {any} str 
     * @returns the number of words of string.
     * @memberof ReadMore
     */
    static countWords(str) {
        return str.split(/\s+/).length;
    }

    /**
     * 
     * 
     * @param {any} str 
     * @param {any} wordsNum 
     * @returns  string starting from first word untill number specified
     * @memberof ReadMore
     */
    static generateTrimmed(str, wordsNum) {
        return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
    }

    static init(options) {

        let defaults = {
            doc: '',
            target: '',
            numOfWords: 50,
            toggle: true,
            moreLink: 'Leer más',
            lessLink: 'Leer menos'
        };

        options = ReadMore.extendObj({}, defaults, options);

        let target = options.doc.querySelectorAll(options.target),       // Get the node list of target elements specified by the user.
            targetLen = target.length,                                   // Length of the targets node list.
            targetContent,                                              // The initial text that is contained in the target element.
            trimmedTargetContent,                                       // The final (trimmed) text.
            targetContentWords,                                         // The number of words the initial text has.
            initArr = [],                                               // Array to hold the initial text of each target element.
            trimmedArr = [],                                            // Array to hold the final (trimmed) text of each target element.
            i, j, l, moreContainer, rmLink, moreLinkID, index;

        // Loop through all target elements	
        for (i = 0; i < targetLen; i++) {
            targetContent = target[i].innerHTML;                                                    // Get the initial text of each target element.
            trimmedTargetContent = ReadMore.generateTrimmed(targetContent, options.numOfWords);        // Generate the trimmed version of the initial text.
            targetContentWords = ReadMore.countWords(targetContent);                                   // Count the number of words the initial text has.

            initArr.push(targetContent);                                                           // Push the initial text to initArr.
            trimmedArr.push(trimmedTargetContent);                                                 // Push the trimmed text to trimmedArr.

            // Procceed only if the number of words specified by the user
            // is smaller than the number of words the target element has.
            if (options.numOfWords < targetContentWords - 1) {
                target[i].innerHTML = trimmedArr[i];                           // Populate the target element with the trimmed version of text.

                moreContainer = document.createElement('span');              // Create a div element to hold the More/Less link.
                moreContainer.innerHTML = '<a id="RM-more_'                    // Create the More/Less link.
                    + i
                    + '" class="RM-link" style="cursor:pointer;">'
                    + ' ' + options.moreLink
                    + '</a>';
                target[i].append(moreContainer);   // Insert the More/Less link after the target element.
            }
        }

        rmLink = options.doc.querySelectorAll('.RM-link');                                                        // Reference the More/Less link.

        // Loop through all links and attach event listeners.
        for (j = 0, l = rmLink.length; j < l; j++) {
            rmLink[j].onclick = function () {
                moreLinkID = this.getAttribute('id');                                                     // Get each link's unique identifier.
                index = moreLinkID.split('_')[1];                                                         // Extract index number from each link's 'id'.

                // if (!helpers.classList.contains(this, 'less')) {
                if (this.getAttribute('data-clicked') !== 'true') {
                    target[index].innerHTML = initArr[index];
                    if (options.toggle !== false) {
                        this.innerHTML = ' ' + options.lessLink;
                        this.setAttribute('data-clicked', true);
                    } else {
                        this.innerHTML = '';
                    }
                } else {
                    target[index].innerHTML = trimmedArr[index];
                    this.innerHTML = ' ' + options.moreLink;
                    this.setAttribute('data-clicked', false);
                }
                target[index].append(this);
            };
        }
    }


}