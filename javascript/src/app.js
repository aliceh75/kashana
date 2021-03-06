define([
    'backbone',
    'jquery',
    'models/models',
    'models/collections',
], function (Backbone, $, models, collections) {
    if (!Aptivate.status) {
        Aptivate.status = {};
    }

    // Initialize collections
    Aptivate.logframe = new models.Logframe(Aptivate.data.logframe);
    Aptivate.logframe.results = new collections.Results();

    // Overview
    Aptivate.logframe.activities = new collections.Activities();
    Aptivate.logframe.budgetlines = new collections.BudgetLines();
    Aptivate.logframe.talines = new collections.TALines();

    // Result page
    Aptivate.logframe.milestones = new collections.Milestones();
    Aptivate.logframe.indicators = new collections.Indicators();
    Aptivate.logframe.subindicators = new collections.SubIndicators();
    Aptivate.logframe.targets = new collections.Targets();
    Aptivate.logframe.assumptions = new collections.Assumptions();

    // Monitor page
    Aptivate.logframe.statusupdates = new collections.StatusUpdates();
    Aptivate.logframe.columns = new collections.Columns();
    Aptivate.logframe.actuals = new collections.Actuals();

});
