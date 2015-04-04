/**
 * the filter module
 */
var filterModule = angular.module('filterModule', []);

filterModule.filter('StringLengthFilter', function() {
    return function(input, len) {
        if (!len) len = 12;
        var result = input || '';
        if (result.length > len) {
            result = result.substr(0, len);
            result += '...';
        }

        return result;
    };
});
