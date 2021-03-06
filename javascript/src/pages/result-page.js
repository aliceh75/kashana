define([
    'jquery',
    'views/result/container',
    'utils/conditional-load',
], function ($, ResultContainer, load) {

    function ResultPage(options) {

        this.load = function (showView) {
            var self = this,
                fetchForResult,
                logframe = Aptivate.logframe,
                promise = load(logframe.results, 'results'); // TODO: load only the result for this page

            promise.then(function () {
                var promises,
                    result = logframe.results.findWhere({
                        id: options.resultId
                    });
                if (result) {
                    fetchForResult = {
                        reset: true,
                        traditional: true,
                        data: { result: result.get("id") }
                    };
                    promises = [
                        load(logframe.milestones, "milestones", { reset: true }),
                        load(logframe.targets, "targets", fetchForResult),
                        load(logframe.subindicators, "subindicators", fetchForResult),
                        load(logframe.indicators, "indicators", fetchForResult),
                        load(logframe.assumptions, "assumptions", fetchForResult)
                    ];

                    $.when.apply(this, promises).then(function () {
                        self.resultContainerView = new ResultContainer({ // TODO: remove subviews on page change
                            model: result,
                        });
                        showView(self.resultContainerView);
                    });
                }
            });
        };

        this.unload = function () {
            // Possible race condition here if remove() is called before the
            // promises above have completed, resultContainerView won't yet exist.
            this.resultContainerView.remove();
        };

    }

    return ResultPage;
});
