class AutoLoad {
    #data = [{}];
    #renderData;
    #templator = null;
    #mainContainer;
    #viewContainer;
    #view;
    // grid
    #gridContainer;
    #gridGap;
    #gridItemWidth;
    #gridItemMinWidth;
    #gridItemHtml = null;
    #gridItemTagName = null;
    // table
    #tableContainer;
    #tableColumns = [];
    #tableRowHtml = null;
    // list
    #listContainer;
    #listGap;
    #listItemWidth;
    #listItemMinWidth;
    #listItemHtml = null;
    #listItemTagName = null;
    // classes
    #listContainerClass
    #gridContainerClass
    #tableClass
    // search
    #searchContainer
    #searchContainerReConfig = true
    //
    #renderState = "main" // search
    #firstRenderRow;
    #lastRenderRow;
    #searchFirstRenderRow = 0
    #searchLastRenderRow = 0
    #currentPage;
    #searchCurrentPage = 1;
    #perLoad
    #totalPages
    #searchTotalPages
    #reRenderGrid = true
    #reRenderList = true
    #reRenderTable = true
    #lazyloadImageColor
    // 
    #position
    // 
    #autoFetch
    #autoFetchWhen
    // observers
    #imgObserver
    #autoloadObserver
    #autoload = true;
    #autoloadWhen
    #autoCleanupWhen
    #errors = []
    constructor(Data, Container) { 
        this.#mainContainer = Container
        this.#mainContainer.style.overflow = "hidden"
        if (!Array.isArray(Data)) {
            this.#errors.push("Invalid Data | Data is Not An Array | Data must be Array Object")
        } else if (Object.prototype.toString.call(Data[0]) !== '[object Object]') {
            this.#errors.push("Invalid Data | Data is Not An Array Object | Data must be Array Object")
        } else {
            this.#data = Data
            this.dataLength = this.#data.length
        }
    }
    config(Options = {}) {
        this.#renderData = this.#data
        this.#perLoad = Options.perLoad || 20;
        this.#lazyloadImageColor = Options.lazyloadImageColor || "#eee";
        this.#autoloadWhen = Options.autoloadWhen || 10;
        // grid
        this.#gridGap = Options.gridGap || "10px";
        this.#gridItemMinWidth = Options.gridItemMinWidth || '200px';
        this.#gridItemWidth = Options.gridItemWidth || 'fit';
        if (Options.gridItemMinWidth && Options.gridItemMinWidth.endsWith("%")) { this.errors.push("In gridItemMinWidth % percentage is not allowed") }
        if (Options.gridItemWidth && Options.gridItemWidth.endsWith("%")) { this.errors.push("In gridItemWidth % percentage is not allowed") }
        // list
        this.#listGap = Options.listGap || "10px";
        this.#listItemMinWidth = Options.listItemMinWidth || '500px';
        this.#listItemWidth = Options.listItemWidth || 'fit';
        if (Options.listItemMinWidth && Options.listItemMinWidth.endsWith("%")) { this.errors.push("In listItemMinWidth % percentage is not allowed") }
        if (Options.listItemWidth && Options.listItemWidth.endsWith("%")) { this.errors.push("In listItemWidth % percentage is not allowed") }
        // search
        this.searchIn = Options.searchIn || "all";
        this.searchCaseSensitive = Options.searchCaseSensitive || false;
        this.#searchContainer = document.createElement('div');
        this.#searchContainer.id = 'ViewSearchContainer';
        this.#mainContainer.append(this.#searchContainer);
        // class
        this.#listContainerClass = Options.listContainerClass || 'data-view-list'
        this.#gridContainerClass = Options.gridContainerClass || 'data-view-grid'
        this.#tableClass = Options.tableClass || 'data-view-table' 
        // positions 
        const POSITIONS = {
            LEFT: "justify-content: flex-start;",
            RIGHT: "justify-content: flex-end;",
            CENTER: "justify-content: center;",
            BETWEEN: "justify-content: space-between;",
            AROUND: "justify-content: space-around;",
            EVENLY: "justify-content: space-evenly;"
        }
        this.#position = POSITIONS[Options.position] || POSITIONS['LEFT'];
        // 
        this.#totalPages = this.#calculateTotalPages();
        this.columns = Object.keys(this.#data[0]);
        this.selected = [];
        this.inSelection = false;
        // currentPage
        this.#currentPage = {
            'grid': 1,
            'list': 1,
            'table': 1
        };
        // firstRenderRow
        this.#firstRenderRow = {
            'grid': 0,
            'list': 0,
            'table': 0
        };
        // lastRenderRow
        this.#lastRenderRow = {
            'grid': 0,
            'list': 0,
            'table': 0
        }
        // 
        this.#templator = new Templator({
            "lazyloadImageColor": this.#lazyloadImageColor
        });
        // Image Observer for lazy load images
        this.#imgObserver = new IntersectionObserver((images) => {
            const length = images.length;
            for (let index = 0; index < length; index++) {
                if (images[index].isIntersecting) {
                    const img = images[index].target;
                    img.src = img.dataset.viewLoadimg
                    img.style.visibility = "visible"
                    // Remove the observer after loading the image
                    this.#imgObserver.unobserve(img);
                }
            }
        }, { rootMargin: "120px" });
        // AutoLoad Observer
        if (this.#autoload) {
            this.#autoloadObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    if (this.#renderState == "main") {
                        if (this.#currentPage[this.#view] < this.#totalPages) {
                            if (this.beforeAutoload) {
                                this.beforeAutoload()
                            }
                            this.#rendering(false);
                            this.#autoloadObserver.unobserve(entry.target)
                            this.autoloaded = true;
                            this.#currentPage[this.#view]++;
                        }
                        else {
                            this.autoloaded = false;
                        }
                    } else if (this.#renderState == "search") {
                        if (this.#searchCurrentPage < this.#searchTotalPages) {
                            if (this.beforeAutoload) {
                                this.beforeAutoload()
                            }
                            this.#rendering(false);
                            this.autoloaded = true;
                            this.#searchCurrentPage++;
                        } else {
                            this.autoloaded = false;
                        }
                    }
                }
            }, { rootMargin: Options.autoloadMargin || "0px" });
        }
        // time out | set these configuration after few seconds
        setTimeout(() => {
            // Search
            this.#searchContainer.style.display = "grid";
            this.#searchContainer.style.position = "relative";
            this.apiSearching = Options.apiSearching || false;
            this.searchApi = Options.searchApi || ""
            this.searchApiOptions = Options.searchApiOptions || {}
            if (this.apiSearching) {
                if (this.searchApi == "") { this.#errors.push("Search API Url not provided for fetching data."); }
                else if (typeof this.searchApi != 'string') { this.#errors.push("Invalid Search API Url"); }
                else if (!this.searchApi.startsWith("http") && !this.searchApi.startsWith("https")) { this.#errors.push("Invalid Search API Url .Protocol not Provided"); }
            }
            // autoFetch
            this.#autoFetch = Options.autoFetch || false;
            this.#autoFetchWhen = Options.autoFetchWhen || 40;
            this.dataApiUrl = Options.dataApiUrl || "";
            this.dataApiOptions = Options.dataApiOptions || {};
            if (this.#autoFetch) {
                if (this.dataApiUrl == "") { this.#errors.push("Data API Url not provided for fetching data."); }
                else if (typeof this.dataApiUrl != 'string') { this.#errors.push("Invalid Data API Url"); }
                else if (!this.dataApiUrl.startsWith("http") && !this.dataApiUrl.startsWith("https")) { this.#errors.push("Invalid Data API Url .Protocol not Provided"); }
            }
            // autoCleanupWhen
            this.#autoCleanupWhen = Options.autoCleanupWhen || 100
            // 
            window.addEventListener("resize", () => {
                if (this.#viewContainer == this.#gridContainer) {
                    this.#gridStyle();
                } else if (this.#viewContainer == this.#listContainer) {
                    this.#listStyle()
                }
            });
        }, 500);
    }
    get errors() {
        return this.#errors;
    }
    get register() {
        const _this = this;
        return {
            templator(Templator) {
                _this.#templator.register(Templator)
            }
        }
    }
    get viewContainer(){
        return this.#viewContainer
    }
    /**
     * @param {null} Html
     */
    set listItemTemplate(Html) {
        if (this.#errors.length > 0) { return }
        Html = Html.trim()
        if (!Html.startsWith("<")) { this.#errors.push("Invalid List Item Template"); return "" }
        // Find the position of the opening bracket and the first space to extract the tag
        const openBracketIndex = Html.indexOf('<');
        const firstSpaceIndex = Html.indexOf(' ', openBracketIndex);
        // Determine the end index based on whether there is a space after the tag
        const endTagIndex = (firstSpaceIndex !== -1) ? firstSpaceIndex : Html.indexOf('>', openBracketIndex);
        // Extract the tag name
        let tagname = Html.slice(openBracketIndex + 1, endTagIndex).toLowerCase();
        tagname = tagname.lastIndexOf('>') != -1 ? tagname.slice(0, -2) : tagname
        if (!Html.endsWith(`</${tagname}>`)) { this.#errors.push("Invalid List Item Template"); return "" }
        this.#listItemTagName = tagname;
        this.#listItemHtml = this.#templator.oneTimeParse(Html);
        // 
        this.#listContainer = document.createElement('div');
        this.#listContainer.id = 'ViewListContainer';
        this.#listContainer.className = this.#listContainerClass;
        this.#listContainer.style.display = "none";
        this.#listContainer.style.gap = this.#listGap;
        this.#listContainer.style.position = "relative";
        this.#mainContainer.append(this.#listContainer);
        this.#listStyle()
    }
    /**
     * @param {string} Html
     */
    set gridItemTemplate(Html) {
        if (this.#errors.length > 0) { return }
        Html = Html.trim()
        if (!Html.startsWith("<") || Html.startsWith("< ")) { this.#errors.push("Invalid Grid Item Template"); return "" }
        // Find the position of the opening bracket and the first space to extract the tag
        const openBracketIndex = Html.indexOf('<');
        const firstSpaceIndex = Html.indexOf(' ', openBracketIndex);
        // Determine the end index based on whether there is a space after the tag
        const endTagIndex = (firstSpaceIndex !== -1) ? firstSpaceIndex : Html.indexOf('>', openBracketIndex);
        // Extract the tag name
        let tagname = Html.slice(openBracketIndex + 1, endTagIndex).toLowerCase();
        tagname = tagname.lastIndexOf('>') != -1 ? tagname.slice(0, -2) : tagname
        if (!Html.endsWith(`</${tagname}>`)) { this.#errors.push("Invalid Grid Item Template"); return "" }
        this.#gridItemTagName = tagname;
        this.#gridItemHtml = this.#templator.oneTimeParse(Html);
        // 
        this.#gridContainer = document.createElement('div');
        this.#gridContainer.id = 'ViewGridContainer';
        this.#gridContainer.className = this.#gridContainerClass;
        this.#gridContainer.style.display = 'none';
        this.#gridContainer.style.gap = this.#gridGap;
        this.#gridContainer.style.position = "relative";
        this.#mainContainer.append(this.#gridContainer);
        this.#gridStyle();
    }
    /**
     * @param {string} Html
     */
    set tableRowHtml(Html) {
        if (this.#errors.length > 0) { return }
        Html = Html.trim()
        if (!Html.startsWith("<")) { this.#errors.push("Invalid Table Row Template"); return "" }
        this.#tableRowHtml = this.#templator.oneTimeParse(Html);
        // 
        this.#tableContainer = document.createElement('table');
        this.#tableContainer.id = 'ViewTableContainer';
        this.#tableContainer.style.position = "relative";
        this.#tableContainer.className = this.#tableClass;
        this.#tableContainer.createTBody();
        this.#tableContainer.style.display = 'none';
        this.#mainContainer.append(this.#tableContainer);
    }
    /**
     * @param {array} Array
     */
    set tableColumns(Array) {
        if (this.#tableRowHtml == null) { this.#errors.push("Please Set Table Row Template First."); return null; }
        this.#tableColumns = Array
        let tHead = this.#tableContainer.createTHead();
        let tableHeadings = "<tr>";
        for (let index = 0; index < this.#tableColumns.length; index++) {
            tableHeadings += `<th>${this.#tableColumns[index]}</th>`;
        }
        tableHeadings += "</tr>";
        tHead.innerHTML = tableHeadings
    }
    /**
     * @param {string} View
     */
    set view(View) {
        if (this.#view == View) { return "This view is already set."; }
        if (this.inSelection) { return "You are in Selection Mode"; }
        const previousView = this.#view;
        this.#view = View;
        if (this.#renderState == 'search') {
            if (this.#view == "table") {
                this.#searchContainer.style.display = "none";
                this.#viewContainer = this.#tableContainer;
                this.#viewContainer.style.display = "table";
            } else {
                this.#tableContainer ? this.#tableContainer.style.display = "none":'';
                this.#searchContainerConfig(this.#view);
                this.#viewContainer = this.#searchContainer;
                this.#viewContainer.style.display = "grid";
            }
            this.#searchFirstRenderRow = 0;
            this.#searchLastRenderRow = 0;
            this.#searchCurrentPage = 1;
            this.#rendering();
            return;
        }
        switch (View) {
            case "grid":
                if (this.#gridItemHtml == null) { this.#errors.push("Please Set Grid Item Template First."); return null; }
                if (this.#listContainer) {
                    this.#listContainer.style.display = "none"
                }
                if (this.#tableContainer) {
                    this.#tableContainer.style.display = "none"
                }
                this.#gridContainer.style.display = "grid";
                this.#viewContainer = this.#gridContainer

                if (this.#reRenderGrid) {
                    this.#lastRenderRow[this.#view] = this.#firstRenderRow[this.#view];
                    this.#rendering();
                }
                this.#searchContainerReConfig = true
                break;
            case "list":
                if (this.#listItemHtml == null) { this.#errors.push("Please Set List Item Template First."); return null; }

                if (this.#gridContainer) {
                    this.#gridContainer.style.display = "none"
                }
                if (this.#tableContainer) {
                    this.#tableContainer.style.display = "none"
                }
                this.#listContainer.style.display = "grid";
                this.#viewContainer = this.#listContainer;

                if (this.#reRenderList) {
                    this.#lastRenderRow[this.#view] = this.#firstRenderRow[this.#view];
                    this.#rendering();
                }
                this.#searchContainerReConfig = true
                break;
            case "table":
                if (this.#tableRowHtml == null) { this.#errors.push("Please Set Table Row Template First."); return null; }

                if (this.#gridContainer) {
                    this.#gridContainer.style.display = "none"
                }
                if (this.#listContainer) {
                    this.#listContainer.style.display = "none"
                }
                this.#tableContainer.style.display = "table"
                this.#viewContainer = this.#tableContainer;

                if (this.#reRenderTable) {
                    this.#lastRenderRow[this.#view] = this.#firstRenderRow[this.#view];
                    this.#rendering()
                }
                break;
        }
        if (this.#lastRenderRow[previousView] >= this.#autoCleanupWhen) {
            this.cleanUp(previousView);
        }
    }
    cleanUp(View) {
        this.#firstRenderRow[View] = 0;
        this.#lastRenderRow[View] = 0;
        this.#currentPage[View] = 0;
        if (View == "grid") {
            this.#gridContainer.innerHTML = "";
            this.#reRenderGrid = true;
        } else if (View == "list") {
            this.#listContainer.innerHTML = "";
            this.#reRenderList = true;
        } else if (View == "table") {
            this.#tableContainer.tBodies[0].innerHTML = '';
            this.#reRenderTable = true;
        }
    }
    async search(Query) {
        if (this.inSelection) { return "You are in Selection Mode"; }
        if (Query == "") {
            let rerender;
            if (this.#view == "grid") { this.#viewContainer = this.#gridContainer; this.#gridContainer.style.display = "grid";rerender =  this.#reRenderGrid}
            else if (this.#view == "list") { this.#viewContainer = this.#listContainer; this.#listContainer.style.display = "grid";rerender =  this.#reRenderList }
            else if (this.#view == "table") { this.#viewContainer = this.#tableContainer; this.#tableContainer.style.display = "table";rerender =  this.#reRenderTable }
            this.#searchContainer.style.display = "none";
            this.#renderData = this.#data;
            this.#searchCurrentPage = 1;
            this.#renderState = "main";
            if (rerender) {
                this.#rendering();
            }
            this.#searchContainer.innerHTML = "";
            this.searchQuery = null;
            return;
        }

        if (this.#searchContainerReConfig) {
            this.#searchContainerReConfig = false;
            this.#searchContainerConfig();
        }
        if (this.apiSearching) {
            const url = this.searchApi.replace(/{(.*?)}/g, (match, placeholder) => {
                if (placeholder == "query") {
                    return Query;
                } else if (placeholder == "searchCaseSensitive") {
                    return this.searchCaseSensitive;
                } else if (placeholder == "column") {
                    return this.searchIn;
                }
                // 
                if (placeholder == "last") {
                    return this.dataLength - 1
                } else if (placeholder == "last:index") {
                    return this.dataLength - 1
                } else if (placeholder == "last:counter") {
                    return this.dataLength
                } else if (placeholder.startsWith("last:")) {
                    return this.#data[this.dataLength - 1][placeholder.slice(5)]?.toString().replace(/ /g, "%20");
                }
                else if (placeholder == "perLoad") {
                    return this.#perLoad
                }
            });
            let data = await fetch(url, this.searchApiOptions);
            try {
                data = await data.json();
                if (this.afterSearching) {
                    this.#renderData = this.afterSearching(data)
                } else {
                    this.#renderData = data;
                }
            } catch (error) {
                if (this.afterSearching) {
                    this.errors.push(error)
                    this.afterSearching(error)
                }
            }
        } else {
            this.#renderData = this.#data.filter((Value) => {
                if (this.searchIn == "all") {
                    if (this.searchCaseSensitive) {
                        return JSON.stringify(Value).includes(Query);
                    } else {
                        return JSON.stringify(Value).toLowerCase().includes(Query.toLowerCase());
                    }
                } else {
                    if (this.searchCaseSensitive) {
                        return String(Value[this.searchIn]).includes(Query);
                    } else {
                        return String(Value[this.searchIn]).toLowerCase().includes(Query.toLowerCase());
                    }
                }
            });
        }
        if (this.#viewContainer != this.#searchContainer) {
            if (this.#view == "grid") { this.#gridContainer.style.display = "none" }
            else if (this.#view == "list") { this.#listContainer.style.display = "none" }
            else if (this.#view == "table") { this.#tableContainer.style.display = "none" }
            if (this.#view == "table") {
                this.#viewContainer = this.#tableContainer;
                this.#viewContainer.style.display = "table";
            } else {
                this.#viewContainer = this.#searchContainer;
                this.#viewContainer.style.display = "grid";
            }
        }
        this.#searchFirstRenderRow = 0;
        this.#searchLastRenderRow = 0;
        this.#searchCurrentPage = 1;
        this.#renderState = "search";
        this.#rendering();
        this.searchQuery = Query;
        this.#searchTotalPages = this.#calculateTotalPages();
    }
    render(View = "grid") {
        this.#view = View;
        switch (View) {
            case "grid":
                if (this.#gridItemHtml == null) { this.#errors.push("Please Set Grid Item Template First."); return null; }
                this.#gridContainer.style.display = 'grid';
                this.#viewContainer = this.#gridContainer;
                break;
            case "list":
                if (this.#listItemHtml == null) { this.#errors.push("Please Set List Item Template First."); return null; }
                this.#listContainer.style.display = 'grid';
                this.#viewContainer = this.#listContainer;
                break;
            case "table":
                if (this.#tableRowHtml == null) { this.#errors.push("Please Set Table Row Template First."); return null; }
                if (this.#tableContainer.tHead == null) { this.#errors.push("Please Set Table Headings First With tableColumns Which Is Setter Method."); }

                this.#tableContainer.style.display = "table"
                this.#viewContainer = this.#tableContainer;
                this.#searchContainerReConfig = false;
                break;
        }
        this.#rendering();
    }
    async #fetchData() {
        let lastRenderRow;
        let dataLength;
        let apiUrl;
        if (this.#renderState == "main") {
            lastRenderRow = this.#lastRenderRow[this.#view];
            dataLength = this.dataLength;
            apiUrl = this.dataApiUrl;
        } else {
            lastRenderRow = this.#searchLastRenderRow;
            dataLength = this.#renderData.length;
            apiUrl = this.searchApi.replace(/{(.*?)}/g, (match, placeholder) => {
                if (placeholder == "query") {
                    return this.searchQuery;
                } else if (placeholder == "searchCaseSensitive") {
                    return this.searchCaseSensitive;
                } else if (placeholder == "column") {
                    return this.searchIn;
                }
            });
        }
        if ((dataLength - (lastRenderRow + 1) <= this.#autoFetchWhen) && dataLength >= this.#perLoad) {
            if (this.beforeAutofetch) {
                this.beforeAutofetch();
            }
            const url = apiUrl.replace(/{(.*?)}/g, (match, placeholder) => {
                if (placeholder == "last") {
                    return this.dataLength - 1
                } else if (placeholder == "last:index") {
                    return this.dataLength - 1
                } else if (placeholder == "last:counter") {
                    return this.dataLength
                } else if (placeholder.startsWith("last:")) {
                    return this.#data[this.dataLength - 1][placeholder.slice(5)]?.toString().replace(/ /g, "%20");
                }
                else if (placeholder == "perLoad") {
                    return this.#perLoad
                }
            });
            let data = await fetch(url, this.dataApiOptions);
            try {
                data = await data.json();
                let newData;
                if (this.afterAutofetch) {
                    newData = this.afterAutofetch(data)

                } else {
                    newData = data
                }
                if (this.#renderState == "main") {
                    this.#data = this.#data.concat(newData);
                    this.#renderData = this.#data;
                } else {
                    this.#renderData = this.#renderData.concat(newData);
                }
                if (!this.autoloaded) {
                    this.#rendering(false);
                    this.autoloaded = true;
                    if (this.#renderState == "main") {
                        this.#currentPage[this.#view]++;
                    } else {
                        this.#searchCurrentPage++;
                    }
                }
                if (this.#renderState == 'main') {
                    this.#totalPages = this.#calculateTotalPages();
                    this.dataLength += newData.length

                } else {
                    this.#searchTotalPages = this.#calculateTotalPages();
                }
            } catch (error) {
                if (this.afterAutofetch) {
                    this.afterAutofetch(error)
                }
                this.errors.push(error)
            }
        }
    }

    #rendering(newInsert = true) {
        if (this.errors.length > 0) { return; }
        let itemHtml;
        let firstRow;
        let lastRow;
        if (this.#renderState == "main") {
            if (newInsert) {
                firstRow = this.#firstRenderRow[this.#view];
            } else {
                firstRow = ++this.#lastRenderRow[this.#view];
            }
            lastRow = this.#lastRenderRow[this.#view];
        } else if (this.#renderState == "search") {

            if (newInsert) {
                firstRow = this.#searchFirstRenderRow;
            } else {
                firstRow = ++this.#searchLastRenderRow;
            }
            lastRow = this.#searchLastRenderRow;
        }
        if (this.#view == "grid") {
            if (this.#gridItemHtml == null) { this.#errors.push("Please Set Grid Item Template First."); return null; }
            itemHtml = this.#gridItemHtml;
        } else if (this.#view == "list") {
            if (this.#listItemHtml == null) { this.#errors.push("Please Set List Item Template First."); return null; }
            itemHtml = this.#listItemHtml;
        } else if (this.#view == "table") {
            if (this.#tableRowHtml == null) { this.#errors.push("Please Set Table Row Template First."); return null; }
            itemHtml = this.#tableRowHtml;
        }
        let numberOfRows = this.#perLoad + lastRow;
        let index;
        const fragment = document.createDocumentFragment();
        const element = document.createElement("tbody");
        for (index = firstRow; index < numberOfRows; index++) {
            if (this.#renderData[index] == undefined) { break; }
            element.insertAdjacentHTML("beforeend", this.#templator.parseOnEveryRow(itemHtml, this.#renderData[index], index));
            fragment.appendChild(element.firstChild);
        }
        if (this.#renderState == "search") {
            this.#searchLastRenderRow = --index;
        } else {
            this.#lastRenderRow[this.#view] = --index;
        }

        let container = this.#viewContainer
        if (this.#view == "table") {
            container = container.tBodies[0]
        }
        if (newInsert) {
            container.innerHTML = "";
            container.appendChild(fragment);
        } else {
            container.appendChild(fragment);
        }
        if (this.afterAutoload) {
            this.afterAutoload();
        }
        setTimeout(() => {
            if (this.#renderState == 'main') {
                if (this.#view == "grid") {
                    this.#reRenderGrid = false;
                } else if (this.#view == "list") {
                    this.#reRenderList = false;
                } else if (this.#view == "table") {
                    this.#reRenderTable = false;
                }
            } else {
                if (this.#view == "table") {
                    this.#reRenderTable = true;
                }
            }
            // 
            const images = document.querySelectorAll(`#${this.#viewContainer.id} img[data-view-loadimg]`);
            const length = images.length;
            for (let index = 0; index < length; index++) {
                this.#imgObserver.observe(images[index]);
            }
            if (this.#view == "table") {
                const childArr = Array.from(this.#viewContainer.rows)
                if (childArr.at(-this.#autoloadWhen)) {
                    this.#autoloadObserver.observe(childArr.at(-this.#autoloadWhen));
                } else {
                    this.#autoloadObserver.observe(childArr.at(-1));
                }
            } else {
                const childArr = Array.from(this.#viewContainer.children)
                if (childArr.at(-this.#autoloadWhen)) {
                    this.#autoloadObserver.observe(childArr.at(-this.#autoloadWhen));
                } else if (childArr.at(-1)){
                    this.#autoloadObserver.observe(childArr.at(-1));
                }
            }
        }, 70);
        if (this.#autoFetch) {
            setTimeout(() => {
                this.#fetchData()
            }, 110);
        }
        if (this.inSelection) {
            setTimeout(() => {
                this.#setupSelection(firstRow, this.#lastRenderRow[this.#view]);
            }, 80);
        }
    }
    #setupSelection(start, end) {
        const options = this.selectionOptions;
        if (this.#viewContainer == this.#tableContainer) {
            const rows = this.#viewContainer.rows;
            if (start == 0) {
                var td = rows[0].insertCell(0);
                td.innerHTML = `<input type="checkbox" class="${options.class}" selection="all">`;
            }
            for (let index = start; index <= end; index++) {
                if (rows[index + 1] == undefined) { break; }
                var td = rows[index + 1].insertCell(0);
                td.innerHTML = `<input type="checkbox" class="${options.class}" selection="${index}">`;
            }
        } else {
            const children = this.#viewContainer.children;
            if (children[start] == undefined) {
                const inputs = this.#viewContainer.querySelectorAll("input[selection]");
                const startIndex = inputs.length
                const last = inputs.length + this.#perLoad
                for (let index = startIndex; index <= last; index++) {
                    if (children[index] == undefined) { break; }
                    children[index].insertAdjacentHTML("afterbegin", `<input type="checkbox" class="${options.class}" selection="${index}" style="position: absolute;top: ${options.top};right:${options.right};bottom:${options.bottom};left: ${options.left};z-index: 5;">`)
                }
            } else {
                for (let index = start; index <= end; index++) {
                    if (children[index] == undefined) { break; }
                    children[index].insertAdjacentHTML("afterbegin", `<input type="checkbox" class="${options.class}" selection="${index}" style="position: absolute;top: ${options.top};right:${options.right};bottom:${options.bottom};left: ${options.left};z-index: 5;">`)
                }
            }
        }
    }
    startSelection(Callback = false, Options = {}) {
        Options.top = Options?.top || "10px";
        Options.right = Options?.right || "auto";
        Options.bottom = Options?.bottom || "auto";
        Options.left = Options?.left || "10px";
        Options.class = Options?.class || "selection";

        this.selectionOptions = Options;
        this.inSelection = true;
        if (this.#viewContainer.rows) {
            this.#setupSelection(0, this.#viewContainer.rows.length - 1);
        } else {
            this.#setupSelection(0, this.#viewContainer.children.length - 1);
        }
        // add Event Listener 
        this.#mainContainer.onclick = (e) => {
            if (!e.target.getAttribute("selection")) {
                e.preventDefault();  
            }
            
            let element; 
            if (this.#viewContainer == this.#gridContainer) {
                element = e.target.closest(`#ViewGridContainer > ${this.#gridItemTagName}`);

            } else if (this.#viewContainer == this.#listContainer) {
                element = e.target.closest(`#ViewListContainer > ${this.#listItemTagName}`);
            } else {
                element = e.target.closest("tbody tr");
            }
            if (element) {
                const input = element.querySelector("input[selection]");
                if (!input) { return; }
                if (e.target != input) { input.checked = !input.checked; }
                
                const index = Number(input.getAttribute("selection"));
                if (input.checked) {
                    this.selected.push({
                        index,
                        data: this.#renderData[index]
                    });
                    input.setAttribute("checked", true);
                }
                else {
                    input.removeAttribute("checked");
                    this.selected.splice(this.selected.findIndex(element => element.index == index), 1);
                }
                if (Callback != false) {
                    Callback({
                        index: index,
                        element: element,
                        checked: input.checked
                    })
                }
            } else {
                const input = this.#viewContainer.querySelector("input[selection=all]");
                if (input) {
                    const inputs = this.#viewContainer.querySelectorAll("input[selection]");
                    const length = inputs.length - 1;
                    if (input.checked) {
                        for (let index = 0; index < length; index++) {
                            const input = inputs[index + 1];
                            this.selected.push({
                                index,
                                data: this.#renderData[index]
                            });
                            input.setAttribute("checked", true);
                            input.checked = true;
                        }
                    } else {
                        for (let index = 0; index < length; index++) {
                            const input = inputs[index + 1];
                            input.removeAttribute("checked");
                            input.checked = false;
                            this.selected.splice(this.selected.findIndex(element => element.index == index), 1);
                        }
                    }
                    if (Callback != false) {
                        Callback({
                            checked: input.checked
                        });
                    }
                }
            }
        }
    }
    stopSelection() {
        this.selected = [];
        this.inSelection = false;
        const inputs = this.#viewContainer.querySelectorAll("input[selection]");
        const length = inputs.length
        if (this.#viewContainer.rows) {
            for (let index = 0; index < length; index++) {
                inputs[index].parentElement.remove();
            }
        } else {
            for (let index = 0; index < length; index++) {
                inputs[index].remove();
            }
        }
        this.#mainContainer.onclick = null
    }
    updateData(Callback) {
        this.#data = Callback(this.#data);
    }
    #searchContainerConfig(View = null) {
        if (this.#viewContainer.id == this.#gridContainer.id || View == "grid") {
            this.#searchContainer.style.gap = this.#gridGap;
            this.#gridStyle(this.#searchContainer);
        } else if (this.#viewContainer.id == this.#listContainer.id || View == "list") {
            this.#searchContainer.style.gap = this.#listGap;
            this.#listStyle(this.#searchContainer);
        } else {
            this.#searchContainer.style.gridTemplateColumns = `repeat(1,1fr)`;
        }
    }
    #gridStyle(Container = this.#gridContainer) {
        let style = ''
        if (this.#gridItemWidth == "fit") {
            style = `
                #${Container.id} > ${this.#gridItemTagName}{
                    min-width:${this.#gridItemMinWidth};
                }
                `;
            let numberOfRows = Math.floor(this.#mainContainer.offsetWidth / (parseInt(this.#gridItemMinWidth.match(/\d*/)[0]) + parseInt(this.#gridGap.match(/\d*/)[0])))
            Container.style.gridTemplateColumns = `repeat(${numberOfRows},1fr)`
        } else {
            style = `
                #${Container.id}{
                    ${this.#position}
                }
                #${Container.id} > ${this.#gridItemTagName}{
                    min-width:${this.#gridItemMinWidth};
                    width:100%;
                    max-width:${this.#gridItemWidth};
                }
                `;
            let numberOfRows = Math.floor(this.#mainContainer.offsetWidth / parseInt(this.#gridItemWidth.match(/\d*/)[0]))
            Container.style.gridTemplateColumns = `repeat(${numberOfRows},${this.#gridItemWidth})`
        }
        // 
        if (document.getElementById("DataViewStyle") == null) {
            const styleTag = document.createElement("style");
            styleTag.id = 'DataViewStyle';
            styleTag.textContent += style
            this.#mainContainer.append(styleTag);

        } else {
            document.getElementById("DataViewStyle").textContent += style
        }
    }
    #listStyle(Container = this.#listContainer) {
        let style = ''
        if (this.#listItemWidth == "fit") {
            style = `
                #${Container.id} > ${this.#listItemTagName}{
                    min-width:${this.#listItemMinWidth};
                }
                `;
            let numberOfRows = Math.floor(this.#mainContainer.offsetWidth / (parseInt(this.#listItemMinWidth.match(/\d*/)[0]) + parseInt(this.#listGap.match(/\d*/)[0])))
            Container.style.gridTemplateColumns = `repeat(${numberOfRows},1fr)`
        } else {
            style = `
                #${Container.id}{
                    ${this.#position}
                }
                #${Container.id} > ${this.#listItemTagName}{
                    min-width:${this.#listItemMinWidth};
                    width:100%;
                    max-width:${this.#listItemWidth};
                }
                `;
            let numberOfRows = Math.floor(this.#mainContainer.offsetWidth / parseInt(this.#listItemWidth.match(/\d*/)[0]))
            Container.style.gridTemplateColumns = `repeat(${numberOfRows},${this.#listItemWidth})`
        }
        // 
        if (document.getElementById("DataViewStyle") == null) {
            const styleTag = document.createElement("style");
            styleTag.id = 'DataViewStyle';
            styleTag.textContent += style
            this.#mainContainer.append(styleTag);

        } else {
            document.getElementById("DataViewStyle").textContent += style
        }
    }
    #calculateTotalPages() {
        return Math.ceil(this.#renderData.length / this.#perLoad);
    }
}

class Templator {
    #templatingBasicMethods;
    #lazyloadImageColor;
    #placeholderRegexForEveryRow;
    #conditionalRegex
    #formatters;
    templator = null
    constructor(Options) {
        this.#templatingBasicMethods = {
            formatNum: this.formatNum
        }
        this.#lazyloadImageColor = Options.lazyloadImageColor
        this.#placeholderRegexForEveryRow = /{%(.[^{%]*?)%}/g;
        this.#conditionalRegex = /\{%if\s+(.*?)\s+%}(.*?){%else%}(.*?){%endif%}/gs;
        this.#formatters = {
            upper: (value) => value.toUpperCase(),
            lower: (value) => value.toLowerCase(),
            firstCap: (value) => value[0].toUpperCase() + value.slice(1).toLowerCase(),
            length: (value, length) => value.slice(0, Number(length)),
            formatNum: (value) => this.formatNum(value),
        };
    }
    register(Templator) {
        this.templator = new Templator(this.#templatingBasicMethods);
    }
    oneTimeParse(Template) {
        const placeholderRegex = /{{(.*?)}}/g;
        let renderedTemplate = Template;
        if (this.templator != null && this.templator.oneTimeParse != undefined) {
            renderedTemplate = this.templator.oneTimeParse(renderedTemplate)
        }
        const date = new Date()
        renderedTemplate = Template.replace(placeholderRegex, (match, placeholders) => {
            const [type, name] = placeholders.split(":")
            const [, ...formatters] = name != undefined ? name.split("|") : ""
            let returnValue = match;
            switch (type) {
                case 'date':
                    switch (name) {
                        case "y":
                            returnValue = date.getFullYear()
                            break;
                        case "m":
                            returnValue = date.getMonth() + 1
                            break;
                        case "d":
                            returnValue = date.getDate()
                            break;
                        default:
                            returnValue = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                            break;
                    }
                    break;
                case 'time':
                    const time = new Date()
                    switch (name) {
                        case "h":
                            returnValue = time.getHours()
                            break;
                        case "m":
                            returnValue = time.getMinutes()
                            break;
                        case "s":
                            returnValue = time.getSeconds()
                            break;
                        default:
                            returnValue = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
                            break;
                    }
                    break;
            }
            return returnValue
        });
        // Load Image
        const tagPlaceholderRegex = /{{loadimage\|(.*?)>}}/g;
        renderedTemplate = renderedTemplate.replace(tagPlaceholderRegex, (match, placeholders) => {
            let [height, element] = placeholders.split("|");
            let width = '';
            if (!element?.startsWith("<img")) {
                width = `width:${element};`
                element = placeholders.split("|")[2]
            }
            if (element?.match(/style=('|")(.*?)/)) {
                element = `${element.slice(0, element.match(/style="?'?(.*?)/).index + 7)}width:100%;height:100%;visibility:hidden;${element.slice(element.match(/style="?'?(.*?)/).index + 7)}>`
            } else {
                element += ` style="width:100%;height:100%;visibility:hidden;">`
            }
            element = element.replace(/src=('|")(.*?)('|")/, (Match, Extra, Value) => {
                return `data-view-loadimg="${Value}"`
            })
            let parent = `<div style="${width}height:${height};background:${this.#lazyloadImageColor};">${element}</div>`
            return parent;
        });
        return renderedTemplate
    }
    parseOnEveryRow(Template, Data, NumberOfRow) {
        let renderedTemplate = Template;
        if (this.templator != null && this.templator.parseOnEveryRow != undefined) {
            renderedTemplate = this.templator.parseOnEveryRow(renderedTemplate, Data, NumberOfRow)
        }
        // Handle conditional statements
        renderedTemplate = renderedTemplate.replace(this.#conditionalRegex, (match, condition, trueBlock, falseBlock) => {
            // Evaluate the condition based on the data
            const [, column] = condition.split(":")
            if (Data[column] == undefined) { return; }
            const subKey = column.match(/\[([^)]+)\]/)
            const columnValue = subKey ? Data[column.slice(0, subKey?.index)][subKey[1]] : Data[column];
            // Return the appropriate block based on the condition
            return columnValue ? trueBlock : (falseBlock ? falseBlock.trim() : '');
        });
        //  
        renderedTemplate = renderedTemplate.replace(this.#placeholderRegexForEveryRow, (match, placeholders) => {
            const [type, others, formatterDynamic] = placeholders.split(":")
            const [name, formatter] = others != undefined ? others.split("|") : ""
            switch (type) {
                case "counter": 
                    return NumberOfRow + 1
                case "column":
                    const subKey = name.match(/\[([^)]+)\]/)
                    let columnValue;
                    if (subKey) {
                        columnValue = Data[name.slice(0, subKey?.index)];
                        columnValue = columnValue ? columnValue[subKey[1]] : columnValue;
                    }else{
                        columnValue = Data[name]
                    }
                    if (columnValue == undefined) { return ''; }
                    if (this.#formatters[formatter]) {
                        return this.#formatters[formatter](columnValue,formatterDynamic);
                    } else {
                        return columnValue;
                    }
            }
        });
        return renderedTemplate;
    }
    formatNum(Value) {
        let array = Value.toString().split('');
        if (array.length == 5 && array[2] != '.') {
            array.splice(2, 0, ",");
        } else {
            if (array[3] != '.' && array.length > 3) {
                array.splice(3, 0, ",");
            }
        }
        if (array.indexOf(".") != -1 && array.length > array.indexOf(".") + 2) {
            array.length = array.indexOf(".") + 2;
        }
        return array.join('');
    }
}
// module.exports = AutoLoad
export default AutoLoad