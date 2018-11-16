<div class="uk-form uk-form-stacked" ng-class="vm.name == 'contentCtrl' ? 'uk-width-large-2-3 wk-width-xlarge-1-2' : ''" ng-controller="zooCtrl as ctrl">

    <h3 class="wk-form-heading">{{'Content' | trans}}</h3>

    <!-- App -->
    <div class="uk-form-row">
        <label class="uk-form-label" for="wk-zoo-app">{{'App' | trans}}</label>
        <div class="uk-form-controls">
            <select id="wk-zoo-app" class="uk-width-1-1" ng-model="content.data.application" ng-options="id as app.name for (id, app) in zoo">
                <option value="">- {{'Select Application' | trans}} -</option>
            </select>
        </div>
    </div>

    <div class="uk-margin-top" ng-if="content.data.application">

        <!-- Mode -->
        <div class="uk-form-row">
            <label class="uk-form-label" for="wk-zoo-mode">{{'Mode' | trans}}</label>
            <div class="uk-form-controls">
                <select id="wk-zoo-mode" class="uk-width-1-1" ng-model="content.data.mode">
                    <option value="categories">{{'Categories' | trans}}</option>
                    <option value="types">{{'Types' | trans}}</option>
                </select>
            </div>
        </div>

        <!-- Type -->
        <div class="uk-form-row" ng-show="content.data.mode == 'types'">
            <label class="uk-form-label" for="wk-zoo-type">{{'Type' | trans}}</label>
            <div class="uk-form-controls">
                <select id="wk-zoo-type" class="uk-width-1-1" ng-model="content.data.type"
                    ng-options="id as type.name for (id, type) in zoo[content.data.application].types">
                </select>
            </div>
        </div>

        <!-- Category -->
        <div class="uk-form-row" ng-show="content.data.mode == 'categories'">
            <label class="uk-form-label" for="wk-zoo-cat">{{'Category' | trans}}</label>
            <div class="uk-form-controls">
                <select id="wk-zoo-cat" class="uk-width-1-1" ng-model="content.data.category"
                    ng-options="cat.id as cat.name for cat in zoo[content.data.application].categories">
                </select>
            </div>
        </div>

        <!-- Subcategories -->
        <div class="uk-form-row" ng-show="content.data.mode == 'categories'">
            <label class="uk-form-label" for="wk-zoo-subcat">{{'Include Subcategories' | trans}}</label>
            <div class="uk-form-controls">
                <select id="wk-zoo-subcat" class="uk-width-1-1" ng-model="content.data.subcategories">
                    <option value="0">{{'No' | trans}}</option>
                    <option value="1">{{'Yes' | trans}}</option>
                </select>
            </div>
        </div>

        <!-- Limit -->
        <div class="uk-form-row">
            <label class="uk-form-label" for="wk-zoo-limit">{{'Limit' | trans}}</label>
            <div class="uk-form-controls">
                <input id="wk-zoo-limit" class="uk-width-1-1" type="number" value="4"  min="1" step="1" ng-model="content.data.count">
            </div>
        </div>

        <!-- Order -->
        <div class="uk-form-row">
            <div class="uk-form-controls">
                <label class="uk-form-label" for="wk-zoo-core-elms">{{'Order' | trans}}</label>
                <select id="wk-zoo-core-elms" class="uk-width-1-1" ng-model="content.data.order"
                    ng-options="el.id as el.name for el in order">
                </select>
            </div>
        </div>

        <h3 class="wk-form-heading uk-margin-large-top">{{'Mapping' | trans}}</h3>

        <ul ng-if="content.data.mode == 'categories'" class="uk-tab" data-uk-tab="{connect:'#zoo-mapping-types'}">
            <li ng-class="$first ? 'uk-active' : ''" ng-repeat="type in zoo[content.data.application].types"><a href="">{{type.name}}</a></li>
        </ul>

        <ul id="zoo-mapping-types" class="uk-switcher uk-margin">

            <li data-id="{{type.id}}" ng-class="{'uk-active' : (content.data.mode == 'categories' || content.data.type == type.id)}" ng-repeat="type in zoo[content.data.application].types">

                <div ng-repeat="field in content.data.fields" class="uk-grid uk-grid-small uk-grid-width-1-2">
                    <div>
                        <label ng-if="$first" class="uk-form-label">{{'Widgetkit Field' | trans}}</label>
                        <div class="uk-form-controls">
                            <input type="text" class="uk-width-1-1" value="{{field.name}}" disabled>
                        </div>
                    </div>
                    <div>
                        <label ng-if="$first" class="uk-form-label">{{'ZOO Field' | trans}}</label>
                        <div class="uk-flex uk-flex-middle">
                            <select class="uk-width-1-1" ng-model="content.data.mapping[type.id][field.id]"
                                ng-options="el.id as el.name group by el.group for el in zoo[content.data.application].types[type.id].elements">
                            </select>
                            <a ng-if="!field.core" class="uk-margin-left uk-text-danger" ng-click="ctrl.deleteField(field)"><i class="uk-icon-trash-o"></i></a>
                        </div>
                    </div>
                </div>

            </li>

        </ul>

        <p>
            <input id="zoo-field-new" type="text" placeholder="{{'Field' | trans}}">
            <a class="uk-button" ng-click="ctrl.addField()">{{'Add' | trans}}</a>
        </p>

    </div>

</div>

<script type="zoo/config">
    <?php echo json_encode($app['plugins']['content/zoo']->getFormData());?>
</script>
