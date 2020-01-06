import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'mysite-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

    // 过滤排序
    searchNameList = [];
    searchAddressList = [];
    filterNameList = [
        {text: 'Joe', value: 'Joe'},
        {text: 'Jim', value: 'Jim'}
    ];
    filterAddressList = [
        {text: 'London', value: 'London'},
        {text: 'Sidney', value: 'Sidney'}
    ];
    sortMap = {
        name: null,
        age: null,
        address: null
    };
    sortName = null;
    sortValue = null;
    data = [
        {
            name: 'John Brown',
            age: 22,
            address: 'New York No. 1 Lake Park'
        },
        {
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];
    displayData = [...this.data];

    // 表头分组
    _displayData = [];
    _data = [];
    _sortValue = null;
    filterName = [
        {text: 'Joe', value: 'Joe'},
        {text: 'John', value: 'John'}
    ];
    searchName = [];

    // 表格编辑
    i = 1;
    editCache = {};
    dataSet = [];

    // 表格嵌套
    nestedTableData = [];
    innerTableData = [];

    // 表格属性定制
    _dataSet = [];
    bordered = false;
    loading = false;
    pagination = true;
    header = true;
    title = true;
    footer = true;
    fixHeader = false;
    size = 'small';
    expandable = true;
    checkbox = true;
    allChecked = false;
    indeterminate = false;
    displayData_ = [];
    simple = false;
    noResult = false;


    constructor() {
    }

    ngOnInit() {

        // 表头分组
        for (let i = 0; i < 100; i++) {
            this._displayData.push({
                name: 'John Brown',
                age: i + 1,
                street: 'Lake Park',
                building: 'C',
                number: 2035,
                companyAddress: 'Lake Street 42',
                companyName: 'SoftLake Co',
                gender: 'M'
            });
        }
        this._data = [...this._displayData];

        // 表格编辑
        for (let i = 0; i < 100; i++) {
            this.dataSet.push({
                key: i.toString(),
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`
            });
        }
        this.updateEditCache();

        // 表格属性定制
        for (let i = 0; i < 3; ++i) {
            this.nestedTableData.push({
                key: i,
                name: 'Screem',
                platform: 'iOS',
                version: '10.3.4.5654',
                upgradeNum: 500,
                creator: 'Jack',
                createdAt: '2014-12-24 23:12:00',
                expand: false
            });
        }
        for (let i = 0; i < 3; ++i) {
            this.innerTableData.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }

        for (let i = 1; i <= 20; i++) {
            this._dataSet.push({
                name: 'John Brown',
                age: `${i}2`,
                address: `New York No. ${i} Lake Park`,
                description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
                checked: false,
                expand: false
            });
        }
    }

    /**
     * 过滤排序
     * @param sortName
     * @param value
     */
    sort(sortName: string, value: string): void {
        this.sortName = sortName;
        this.sortValue = value;
        for (const key in this.sortMap) {
            this.sortMap[key] = (key === sortName ? value : null);
        }
        this.search(this.searchNameList, this.searchAddressList);
    }

    search(searchNameList: string[], searchAddressList: string[]): void {
        this.searchNameList = searchNameList;
        this.searchAddressList = searchAddressList;
        const filterFunc = item => (this.searchAddressList.length ? this.searchAddressList.some(address => item.address.indexOf(address) !== -1) : true) && (this.searchNameList.length ? this.searchNameList.some(name => item.name.indexOf(name) !== -1) : true);
        const data = this.data.filter(item => filterFunc(item));
        if (this.sortName && this.sortValue) {
            this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
        } else {
            this.displayData = data;
        }
    }

    resetFilters(): void {
        this.filterNameList = [
            {text: 'Joe', value: 'Joe'},
            {text: 'Jim', value: 'Jim'}
        ];
        this.filterAddressList = [
            {text: 'London', value: 'London'},
            {text: 'Sidney', value: 'Sidney'}
        ];
        this.searchNameList = [];
        this.searchAddressList = [];
        this.search(this.searchNameList, this.searchAddressList);
    }

    resetSortAndFilters(): void {
        this.sortName = null;
        this.sortValue = null;
        this.sortMap = {
            name: null,
            age: null,
            address: null
        };
        this.resetFilters();
        this.search(this.searchNameList, this.searchAddressList);
    }

    /**
     * 表头分组
     * @param searchName
     */
    _search(searchName: string[]): void {
        this.searchName = searchName;
        const filterFunc = (item) => {
            return this.searchName.length ? this.searchName.some(name => item.name.indexOf(name) !== -1) : true;
        };
        const data = this._data.filter(item => filterFunc(item));
        this._displayData = data.sort((a, b) => (this._sortValue === 'ascend') ? (a.age > b.age ? 1 : -1) : (b.age > a.age ? 1 : -1));
    }

    /**
     * 表格编辑
     * @param key
     */
    startEdit(key: string): void {
        this.editCache[key].edit = true;
    }

    cancelEdit(key: string): void {
        this.editCache[key].edit = false;
    }

    saveEdit(key: string): void {
        const index = this.dataSet.findIndex(item => item.key === key);
        Object.assign(this.dataSet[index], this.editCache[key].data);
        // this.dataSet[ index ] = this.editCache[ key ].data;
        this.editCache[key].edit = false;
    }

    deleteRow(i: string): void {
        const dataSet = this.dataSet.filter(d => d.key !== i);
        this.dataSet = dataSet;
    }

    updateEditCache(): void {
        this.dataSet.forEach(item => {
            if (!this.editCache[item.key]) {
                this.editCache[item.key] = {
                    edit: false,
                    data: {...item}
                };
            }
        });
    }

    /**
     * 表格属性定制
     * @param $event
     */
    currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; expand: boolean; description: string; }>): void {
        this.displayData_ = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        const validData = this.displayData_.filter(value => !value.disabled);
        const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
        const allUnChecked = validData.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    checkAll(value: boolean): void {
        this.displayData_.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }

    noResultChange(status: boolean): void {
        this._dataSet = [];
        if (!status) {
            this.ngOnInit();
        }
    }

}
