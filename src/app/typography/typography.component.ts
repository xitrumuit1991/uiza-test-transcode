import { Component, ViewChild } from '@angular/core';
import { UizaModalPopupComponent } from '../@core/component/modal-popup/modal-popup.component';

@Component({
  selector: 'app-uiza-typography',
  templateUrl: './typography.component.html',
})

export class UizaTypographyComponent {
  @ViewChild(UizaModalPopupComponent) uizaModalPopupComponent: UizaModalPopupComponent;

  title = 'app';
  settingsChart: any = [
    { chartID: 'chart0', data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3], labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'], lineColor: 'orange', pointColor: 'orange', chartTitle: 'chart0', 'width': '1470px', 'height': '300px',xGridLines:false},
    { chartID: 'chart1', data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3], labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'], lineColor: 'blue', pointColor: 'blue', chartTitle: 'chart1', 'width': '470px', 'height': '300px',xGridLines:false},
    { chartID: 'chart2', data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3], labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'], lineColor: 'green', pointColor: 'green', chartTitle: 'chart2', 'width': '470px', 'height': '300px',xGridLines:false },
    { chartID: 'chart3', data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3], labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'], lineColor: 'purple', pointColor: 'purple', chartTitle: 'chart3', 'width': '470px', 'height': '300px',xGridLines:false },
    { chartID: 'chart4', data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3], labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'], lineColor: 'purple', pointColor: 'purple', chartTitle: 'chart4', 'width': '470px', 'height': '300px',xGridLines:false,yGridLines:false,xAxes:false,yAxes:false },
    { chartID: 'chart5',type:'pie' , data: [12, 19, 3], lineColor: 'purple', pointColor: 'purple', chartTitle: 'chart5', 'width': '470px', 'height': '300px'}


  ];
  sourceDataCard = [{
    color:'orange',
    title: 'Managed Minutes',
    value: [{ value: '1000000' }]
  }, {
    color:'blue',
    title: 'Streaming Minutes',
    value: [{ value: '200000' }]
  }, {
    color:'green',
    title: 'Api Calls',
    value: [
      { title: 'Non-DRM', value: '3000000' },
      { title: 'DRM', value: '700' }]
  }, {
    color:'purple',
    title: 'Live Channel Minutes',
    value: [
      { title: 'Non-DRM', value: '3000000' },
      { title: 'DRM', value: '700' }]
  }];

  sourceHeader = [
    {color: 'orange',left: {title: 'Managed Minuted', value: ''},center: {title: 'Total Usage:', value: '120,000 Minutes'},right: {title: 'Total Amount:', value: '$200,000'}},
    {color: 'blue',left: {title: 'Streaming Minutes', value: ''},center: {title: 'Total Usage:', value: '120,000 Minutes'},right: {title: 'Total Amount:', value: '$200,000'}},
    {color: 'green',left: {title: 'API calls', value: ''},center: {title: 'Total Usage:', value: '120,000 Minutes'},right: {title: 'Total Amount:', value: '$200,000'}},
    {color: 'purple',left: {title: 'Live Channel Minutes', value: ''},center: {title: 'Total Usage:', value: '120,000 Minutes'},right: {title: 'Total Amount:', value: '$200,000'}}
  ];

  sourceNoticeColor = [
    {button: true, buttonName: 'Change plan', type: 'notice-primary', title: 'Your Current Plan : notice-primary', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-secondary', title: 'Your Current Plan : notice-secondary', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-success', title: 'Your Current Plan : notice-success', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-warning', title: 'Your Current Plan : notice-warning', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-process', title: 'Your Current Plan : notice-process', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-danger', title: 'Your Current Plan : notice-danger', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
    {button: true, buttonName: 'Change plan', type: 'notice-admin', title: 'Your Current Plan : notice-admin', value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.'},
  ];
}
