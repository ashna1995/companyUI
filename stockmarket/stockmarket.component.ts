import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Stockmarket } from './Stockmarket';
import { StockmarketService } from './stockmarket.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';
@Component({
  selector: 'app-stockmarket',
  templateUrl: './stockmarket.component.html',
  styleUrls: ['./stockmarket.component.css']
})

export class StockmarketComponent implements OnInit {
  public myForm: FormGroup | any;
  private searchEventSubscription: Subscription | any;
  displayedColumns: string[] = [  'companyCode',
  'companysName', 
 'companysCEO',
  'companyTurnover',
 'companyWebsite', 
'stockExchange',
  'stockprice',
  'time'];
  constructor(private http:HttpClient, private comp:StockmarketService) 
    {
      
     }

  ngOnInit(): void
   {
  
   
      
    this.minmax();
    this.viewAllCompanys;
  }

data: {} |any;
dat :any;
companymodel:Stockmarket = new Stockmarket();
com:Stockmarket = new Stockmarket();
companyarr:Array<Stockmarket>=[];
cmv:Array<Stockmarket>=[];
csp:Array<Stockmarket>=[];
companyCode:number |any;
max : number=0;
min: number=0;
sum :number=0;
avg :number=0;
cname1 :String|any
cname2:String|any
t1 :Time|any;
t2 :Time|any;
dataSource = new MatTableDataSource(this.companyarr);
d1 = new MatTableDataSource(this.csp);
Register()
{
  this.comp.register(this.companymodel).subscribe(data=>
    {
      this.data = JSON.stringify(data);
      this.companyarr.push(this.data);
      this.minmax();
    })
  
}

viewAllCompanys()
{
  this.comp.getAll().subscribe(
    data=>
    {
     
      console.log(Object.values(data ));
      this.companyarr = Object.values(data );
      this.dataSource = new MatTableDataSource(this.companyarr);

    },
    error=>
    {
      console.log(error);
    })
};
deleteCompany(cid:number)
  {
    this.comp.delete(cid).subscribe(data=>
      {
        console.log("Record is deleted!",data);
        let companyIndex = this.companyarr.findIndex(c=>c.companyCode === cid);
        console.log(companyIndex);
        this.companyarr.splice(companyIndex,1);
        this.viewAllCompanys();
        this.minmax();
      },
      error=>
      {
        console.log("error");
      }
      
      )
  }
  Update()
{
  this.comp.update(this.companymodel).subscribe(data=>
    {
      this.data = JSON.stringify(data);
      this.companyarr.push(this.data);
      this.minmax();
    })
}

viewSingleCompany(cid:number)
{
  this.comp.getSingleCompany(cid).subscribe(
    data=>
    {
      console.log(Object.values(data ));
      this.csp = Object.values(data );
     this.d1 = new MatTableDataSource(this.csp);
    },
    error=>
    {
      console.log(error);
    })
};
addStock(cid:number)
{
  this.comp.addStock(cid,this.companymodel).subscribe(data=>
    {
      this.data = JSON.stringify(data);
      this.companyarr.push(this.data);
      console.log(Object.values(data ));
      this.minmax();
    },
    error=>
    {
      console.log(error);
    
    })


}
updateStock(cid:number)
{
  this.comp.updateStock(cid,this.companymodel).subscribe(data=>
    {
      this.data = JSON.stringify(data);
      this.companyarr.push(this.data);
      console.log(Object.values(data ));
      this.minmax();
    },
    error=>
    {
      console.log(error);
    })
}
minmax()
{

  this.comp.getAll().subscribe(
    data=>
    {
     this.sum=0;
      console.log(Object.values(data ));
      this.cmv = Object.values(data );
       this.max=0;
      for(let j=0;j<data.length;j++)
      {
        this.sum=this.sum+this.cmv[j].stockprice;
       if (this.max<this.cmv[j].stockprice)
       {
        this.max=this.cmv[j].stockprice;
        this.cname1=this.cmv[j].companysName;
       }
      }
      this.avg=this.sum/data.length;
      this.min=this.max;
      this.cname2=this.cname1;
      console.log(this.max);
      console.log(this.min);
      for(let j=0;j<data.length;j++)
      {
       if (this.min>this.cmv[j].stockprice && this.cmv[j].companyCode!=0)
       {
        this.min=this.cmv[j].stockprice;
        this.cname2=this.cmv[j].companysName;
       }
      }
      console.log(this.min);

    },
    error=>
    {
      console.log(error);
    })
};

applyFilter(event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
 
}
minmaxavgtime(t1:Time,t2:Time)
{

  this.comp.getAll().subscribe(
    data=>
    {
     this.sum=0;
      console.log(Object.values(data ));
      this.cmv = Object.values(data );
       this.max=0;
      for(let j=0;j<data.length;j++)
      {
        if( this.cmv[j].time>=t1 && this.cmv[j].time<=t2)
        {
        this.sum=this.sum+this.cmv[j].stockprice;
        }
       if (this.max<this.cmv[j].stockprice && this.cmv[j].time>=t1 && this.cmv[j].time<=t2)
       {
         
        this.max=this.cmv[j].stockprice;
        this.cname1=this.cmv[j].companysName;
       }
      }
      this.avg=this.sum/data.length;
      this.min=this.max;
      this.cname2=this.cname1;
      console.log(this.max);
      console.log(this.min);
      for(let j=0;j<data.length;j++)
      {
       if (this.min>this.cmv[j].stockprice && this.cmv[j].companyCode!=0 && this.cmv[j].time>=t1 && this.cmv[j].time<=t2)
       {
        this.min=this.cmv[j].stockprice;
        this.cname2=this.cmv[j].companysName;
       }
      }
      console.log(this.min);

    },
    error=>
    {
      console.log(error);
    })
};




}