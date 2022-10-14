import { Actions } from '@ngrx/effects';
import { TankActionTypes } from './../../../store/tanks/tank.actions';
import { TankService } from './../../../services/tank.service';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { Store } from '@ngrx/store';
import { MiscService } from './../../../services/misc.service';
import { Observable } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromSelectors from '../../../store/app-selectors';
import { Tank } from 'src/app/models/tank';
import { AppState } from 'src/app/store/app';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnChanges {

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  form = this.fb.group({
    _id: [''],
    species: ['', [Validators.required]],
    area: ['', [Validators.required, Validators.minLength(2)]],
    date_start: ['', [Validators.required]],
    cycle: ['', [Validators.required]],
    fish_start: ['', [Validators.required]],
    weight_start: ['', [Validators.required]],
    food_cycle: ['complete'],
    date_end: [''],
    fish_end: [''],
    weight_end: [''],
    create_at: [''],
    update_at: [''],
    food: this.fb.group({
      complete: [0],
      priceComplete: [0],
      month: this.fb.array([]),
      prices: this.fb.array([]),
    }),
    revenue: this.fb.array([]),
    expenses: this.fb.group({
      fertilizers: [''],
      correctives: [''],
      analysis: [''],
      pack: [''],
      labor: [''],
      transport: [''],
      assistance: [''],
      taxes: [''],
      others: [''],
    }),
  });

  controlRevenue = this.form.get('revenue') as FormArray;
  controlFishStart = this.form.get('fish_start') as FormControl;
  controlFishEnd = this.form.get('fish_end') as FormControl;
  crIndex = 0;

  isCreated = false;

  cycle: any = [];
  amountFish: any = [];
  cyclePrices: number[] = [];
  cycleMonth: number[] = [];

  foodControl = this.form.get('food') as FormGroup;
  monthControl = this.foodControl.get('month') as FormArray;
  pricesControl = this.foodControl.get('prices') as FormArray;

  species = [
    'tilápia',
    'tambaqui',
    'tambacu',
    'tambatinga',
    'carpa',
    'pacu',
    'patinga',
    'pintado',
    'cachara',
    'cachapira',
    'pintachara',
    'surubim',
    'matrinxã',
    'jatuarana',
    'piabanha',
    'piracanjuba',
    'piau',
    'piapara',
    'piauçu',
    'piava',
    'curimatã',
    'curimbatá',
    'outros',
  ];

  endDateSuggestion: string | undefined;

  middleWeigth: number[] = [];
  middleWeigthF: number[] = [];

  tanks$: Observable<Tank[] | undefined> = new Observable<Tank[]>();
  tankRef$: Observable<Tank | undefined> = new Observable<Tank>();
  idRef$: Observable<string | null> = new Observable<string>();
  idRef: string | undefined;

  constructor(
    private fb: FormBuilder,
    private routerAtiva: ActivatedRoute,
    public misc: MiscService,
    private store: Store<AppState>,
    private tankService: TankService,
    private Actions$: Actions
  ) {
    this.cycleGenerator();
    this.amountFishGenerator();

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.tanks$ = this.store.select(fromSelectors.selectAll);
    this.getItem();
    this.middleGenerator();
    console.log(`req`);
    
    this.tankService.getAll().subscribe((res)=>{
      console.log(res);
      
    })
  
  }

  getItem() {
    const id = this.routerAtiva.snapshot.paramMap.get('id');
    if (!id) {return;}
    this.tankRef$ = this.store.select(fromSelectors.selectEntity(id));
    this.tankRef$.subscribe((res: any) => {
      if (!res) {return;}
      this.form.patchValue({
        _id: res.id,
        type: res.type,
        area: res.area,
        cycle: res.cycle,
        fish_start: res.fish_start,
        weight_start: res.weight_start,
        food_cycle: res.food_cycle,
        fish_end: res.fish_end,
        weight_end: res.weight_end,
        create_at: res.create_at,
        update_at: res.update_at,
        food: {
          priceComplete: res.food.priceComplete,
          complete: res.food.complete,
          month: res.food.month,
          prices: res.food.prices,
        },
        expenses: {
          fertilizers: res.expenses.fertilizers,
          correctives: res.expenses.correctives,
          analysis: res.expenses.analysis,
          pack: res.expenses.pack,
          labor: res.expenses.labor,
          transport: res.expenses.transport,
          assistance: res.expenses.assistance,
          taxes: res.expenses.taxes,
          others: res.expenses.others,
        },
      });
      if (res.date_start.seconds) {
        this.form.patchValue({
          date_start: new Date(res.date_start.seconds * 1000),
        });
      }
      if (res.date_end.seconds) {
        this.form.patchValue({
          date_end: new Date(res.date_end.seconds * 1000),
        });
      }
      if (!this.form.value.revenue?.length) {
        this.createInputsRevenue();
      } else {
        for (let index = 0; index < this.form.value.revenue.length; index++) {
          this.createInputsRevenue();
        }
      }
      this.createEndDate();
      this.enableDisableRevenueControls();
      this.isCreated = true;

      if(res.food_cycle){
        this.foodcycleSelect();
        this.form.patchValue({
          food:{
            prices: res.food.prices
          }
        })
      }

    });
  }

  createItem(): void {
    const data = {...this.form.value}
    delete data?._id;
    this.store.dispatch(TankActionTypes.SetNewTank({tank: data}))
    
  }

  foodcycleSelect() {
    const comp = this.form.value.food.complete;
    const mon = this.form.value.cycle;
    if (!mon) return;
    // console.log(comp, mon, wee);
    this.cycleMonth = [];

    for (let index = 0; index < mon; index++) {
      const m = comp / mon;
      this.cycleMonth.push(mon);
      if (this.monthControl.length < this.cycleMonth.length) {
        this.monthControl.push(this.fb.control(m));
        this.pricesControl.push(this.fb.control(0));
      } else {
        // this.monthControl.at(index).setValue(m);
      }
    }
  }

  sumInputs() {
    // const comp = this.form.value.food.complete;
    // console.log('t',this.weekControl.value);
    const resWeigth: any = [];
    let comp: any = '';
    const resPrices: any = [];
    let pric: any = '';

    this.form.value.food.month.map((res: any) => resWeigth.push(Number(res)));
    this.form.value.food.prices.map((res: any) => resPrices.push(Number(res)));
    // this.form.value.food.week.map((res: any)=> results.push(Number(res)));
    comp = resWeigth.reduce((prev: any, cur: any) => prev + cur);
    pric = resPrices.reduce((prev: any, cur: any) => prev + cur);
    console.log(pric);

    console.log(comp);
    this.form.patchValue({
      food: { complete: comp, priceComplete: pric },
    });
  }

  cycleGenerator() {
    for (let index = 2; index < 37; index++) {
      this.cycle.push(index.toString());
    }
  }

  amountFishGenerator() {
    for (let index = 1; index < 51; index++) {
      const result = index * 1000;
      this.amountFish.push(result);
    }
  }

  middleGenerator() {
    this.middleWeigth = [];
    for (let index = 5; index < 51; index++) {
      this.middleWeigth.push(index);
    }
  }

  createEndDate() {
    if (!this.form.value.date_start || !this.form.value.cycle) {
      return;
    }
    const dateStart = new Date(this.form.value.date_start);
    const days = this.form.value.cycle * 30;
    const dateResult = new Date(dateStart.setDate(dateStart.getDate() + days));
    this.form.patchValue({
      date_end: dateResult,
    });
    this.endDateSuggestion = dateResult.toLocaleDateString('pt-br');
  }

  createInputsRevenue() {
    let optsDefault = ['vivos', 'abatidos', 'outros'];
    if (this.controlRevenue.length < 3) {
      this.controlRevenue.push(
        this.fb.group({
          description: [''],
          qtd: [''],
          price: [''],
        })
      );

      let i = this.controlRevenue.length - 1;
      this.limitQtd(i);
      this.controlRevenue.controls[i]
        .get('description')
        ?.setValue(optsDefault[i]);
    }
  }

  enableDisableRevenueControls() {
    if (!this.form.value.fish_end) {
      for (let i = 0; i < this.controlRevenue.controls.length; i++) {
        this.controlRevenue.controls[i].get('description')?.disable();
        this.controlRevenue.controls[i].get('qtd')?.disable();
        this.controlRevenue.controls[i].get('price')?.disable();
      }
    } else {
      for (let i = 0; i < this.controlRevenue.controls.length; i++) {
        this.controlRevenue.controls[i].get('description')?.enable();
        this.controlRevenue.controls[i].get('qtd')?.enable();
        this.controlRevenue.controls[i].get('price')?.enable();
      }
    }
  }

  deleteInputsRevenue(i: number) {
    console.log(i);

    if (i != null && i > 0) {
      this.controlRevenue.removeAt(i);
    }
  }

  limitFishEnd() {
    this.controlFishEnd.addValidators([
      Validators.min(1),
      Validators.max(this.controlFishStart.value),
    ]);
  }

  limitQtd(i: any): number {
    const controlRef = this.controlRevenue.controls[i].get('qtd');
    let result: number;

    switch (i) {
      case 0:
        result = this.controlFishEnd.value;

        controlRef?.addValidators([Validators.max(result)]);
        return result;
      case 1:
        result =
          this.controlFishEnd.value -
          this.controlRevenue.controls[0].get('qtd')?.value;
        controlRef?.addValidators([Validators.max(result)]);
        return result;
      case 2:
        result =
          this.controlFishEnd.value -
          this.controlRevenue.controls[0].get('qtd')?.value -
          this.controlRevenue.controls[1].get('qtd')?.value;
        controlRef?.addValidators([Validators.max(result)]);
        return result;
      default:
        return 0;
    }
  }
}
