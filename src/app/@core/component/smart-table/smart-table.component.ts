import { Component, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-uiza-smart-table',
  styleUrls: ['./smart-table.component.scss'],
  templateUrl: './smart-table.component.html',
})

export class UizaSmartTableComponent {
  @Input() source: any = [{
    first: "name",
    last: 'act',
    handle: 'handle',
    checkbox: false,
    radio: 1,
    status: 1,
    money: 10000,
    toggleSwitch: 1
  }, {
    first: 'name 2',
    last: 'act 2',
    handle: 'handle',
    checkbox: 0,
    radio: 1,
    status: 0,
    money: 1000,
    toggleSwitch: 1
  }, {
    first: 'name 2',
    last: 'act 2',
    handle: 'handle',
    checkbox: 0,
    radio: 1,
    status: 0,
    money: 100,
    toggleSwitch: 1
  }
  ];

  @Input() settings: any = {
    // hideSubHeader:true,
    emptyContent: {
      icon: 'icon-noreview',
      createNew: true,
      createNewTitle: "Create New",
      textEmpty: "You haven't created task any customers yet.",
      createNewFunction: () => {
        console.log('create new in table');
      }
    },
    display: {
      rowNumber: true,
      paging: true,
      actions: true,
      select: true,
      selectText : true,
      enableSelectAll: true,
      showPageNumber: false,
    },
    limits: [5, 10, 15, 20],
    paging: {
      total: 200,
      page: 1,
      limit: 5,
      onChange: (data) => {
        console.log(data)
      }
    },
    actions: {
      delete: true,
      edit: true
    },
    editIcon: '',
    editFunction: (data) => {
      console.log('Edit :', data)
    },
    deleteIcon: '',
    deleteFunction: (data) => {
      console.log('Delete :', data)
    },
    selectFunction: (data, value) => {
      console.log('Select', data);
      console.log('value1 ', value);
      value.isSelected = data;
      console.log('value2 ', value);
    },
    clickFunction: (data) => {
      console.log('Click :', data);
    },
    defaultHeaderClass: 'text-left',
    // mainHeaderColumns: [
    //   { title: 'Group 1', colspan: 3, class: 'text-center' },
    //   { title: 'Group 2', colspan: 2, class: 'text-center' },
    //   { title: 'Group 3', colspan: 1, class: 'text-center' },
    //   { title: 'Group 4', colspan: 1, class: 'text-center' },
    // ],
    subHeaderColumns: [
      { title: 'Group 1', colspan: 3, class: 'text-center' },
      { title: 'Group 2', colspan: 2, class: 'text-center' },
      { title: 'Group 3', colspan: 1, class: 'text-center' },
      { title: 'Group 4', colspan: 1, class: 'text-center' },
    ],

    footerColumns: [
      { title: 'Total', colspan: 3, class: 'text-center' },
      { title: 'Price', colspan: 7, class: 'text-center' },
    ],

    columns: {
      first: {
        title: 'First',
        type: 'string',
        class: 'text-center'
      },
      last: {
        title: 'Last',
        type: 'string',
      },
      handle: {
        title: 'Handle',
        type: 'string',
      },
      money: {
        title: 'Money',
        type: 'money',
      },
      status: {
        title: 'Status',
        type: 'custom',
        valuePrepareFunction: (data) => {
          if (data === 0) {
            return '<span class="badge badge-pill badge-danger">Unactive</span>'
          }
          return '<span class="badge badge-pill badge-success">Active</span>'
        }
      },
      checkbox: {
        title: 'Checkbox',
        type: 'checkbox',
        onChange: (value, data, key) => {
          data[key] = value
          console.log('change', value);
        }
      },
      radio: {
        title: 'Radio',
        type: 'radio',
      },
      toggleSwitch: {
        title: 'Toggle Switch',
        type: 'toggleSwitch',
      }

    },
  };
  ngOnInit() {
    // $('[data-toggle="tooltip"]').tooltip();
    this.settings.paging.limit = localStorage.uiza_paging_limit || 5
    this.onLimitChange(this.settings.paging.limit)
  }
  onLimitChange(limit) {
    localStorage.uiza_paging_limit = limit
    this.settings.paging.onChange({ page: 1, limit: parseInt(limit) })
    this.settings.paging.page = 1
  }
  onSelectPaging = ($event) => {
    let value = $event.currentTarget.value;
    let limit = localStorage.uiza_paging_limit;
    this.settings.paging.onChange({ page: value, limit: parseInt(limit) });
    this.settings.paging.page = value;
  }
  onSelectChange = (value, data) => {
    if (typeof this.settings.selectFunction === 'function') {
      this.settings.selectFunction(value, data)
    }
  }
  testData = () => {
    console.log(this.source)
  }

  onSelectAll = (value) => {
    this.source.forEach((item) => {
      item.isSelected = value
    })
  }

}
