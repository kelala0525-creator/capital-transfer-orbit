export type Direction='inflow'|'outflow';
export type Asset={id:string;code:string;name:string;sector:string;type:'股票'|'ETF';direction:Direction;amount:number;change:number;rank:number;confidence:number;latitude:number;longitude:number;importance:number;foreign:number;trust:number;dealer:number;close:number;date:string};
export type Snapshot={date:string;assets:Asset[];universe:number;updatedAt:string;partial?:boolean;warnings?:string[]};
export type News={id:string;title:string;source:string;category:string;time:string;url:string};
export type Volatility={value:number;change:number;date:string;source:string};
