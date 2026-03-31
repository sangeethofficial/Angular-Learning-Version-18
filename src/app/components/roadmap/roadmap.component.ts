import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ─── Interfaces ───────────────────────────────────────────────
export interface SubTopic {
  text: string;
  code?: string;
}

export interface Topic {
  title: string;
  diff: number; // 1-5
  subtopics: SubTopic[];
  snippet?: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  level: 'basic' | 'mid' | 'advanced' | 'expert';
  topics: Topic[];
}

// ─── Data ──────────────────────────────────────────────────────
const PHASES: Phase[] = [
  {
    id: 'core',
    title: 'Core Fundamentals',
    subtitle: 'Components, Modules, Templates — the Angular foundation',
    level: 'basic',
    topics: [
      {
        title: 'Angular Architecture Overview',
        diff: 2,
        subtopics: [
          { text: 'NgModules vs Standalone Components', code: '@NgModule' },
          { text: 'App bootstrap flow — main.ts → AppModule → AppComponent' },
          { text: 'Angular CLI — ng new, ng generate, ng serve, ng build' },
          { text: 'Project folder structure deep dive' },
          { text: 'angular.json configuration — budgets, assets, environments' },
        ],
        snippet: `@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  bootstrap: [AppComponent]\n})`
      },
      {
        title: 'Components',
        diff: 2,
        subtopics: [
          { text: 'Lifecycle hooks — ngOnInit, ngOnChanges, ngOnDestroy etc.' },
          { text: '@Input(), @Output(), EventEmitter' },
          { text: 'ViewEncapsulation — Emulated, None, ShadowDom', code: 'encapsulation' },
          { text: 'ChangeDetectionStrategy.OnPush', code: 'OnPush' },
          { text: 'Content projection — ng-content, multi-slot', },
          { text: 'Standalone Components (Angular 14+)', code: 'standalone: true' },
        ]
      },
      {
        title: 'Templates & Data Binding',
        diff: 2,
        subtopics: [
          { text: 'Interpolation {{ }}, Property binding [ ], Event binding ( )' },
          { text: 'Two-way binding [(ngModel)]' },
          { text: 'Template reference variables — #varName' },
          { text: 'ng-template, ng-container, ng-content' },
          { text: 'Safe navigation operator — user?.name', code: '?.' },
        ]
      },
      {
        title: 'Built-in Directives',
        diff: 2,
        subtopics: [
          { text: '*ngIf, *ngFor, *ngSwitch (legacy)' },
          { text: 'New control flow — @if, @for, @switch (Angular 17+)', code: '@if @for' },
          { text: 'Attribute directives — ngClass, ngStyle' },
          { text: 'Custom directives — @HostListener, @HostBinding' },
        ]
      },
      {
        title: 'Pipes',
        diff: 2,
        subtopics: [
          { text: 'Built-in — date, currency, json, async, slice, titlecase' },
          { text: 'Custom pipe with PipeTransform interface' },
          { text: 'Pure vs Impure pipes' },
          { text: 'Chaining pipes' },
        ]
      },
    ]
  },
  {
    id: 'di',
    title: 'Dependency Injection & Services',
    subtitle: 'DI system, services, providers, injection tokens',
    level: 'basic',
    topics: [
      {
        title: 'DI System Deep Dive',
        diff: 3,
        subtopics: [
          { text: 'DI Hierarchy — Root, Platform, Module, Component injectors' },
          { text: 'providedIn — root, any, platform, null' },
          { text: 'useClass, useValue, useFactory, useExisting' },
          { text: 'InjectionToken for non-class dependencies', code: 'InjectionToken' },
          { text: 'inject() function (Angular 14+)', code: 'inject()' },
          { text: 'Multi providers', code: 'multi: true' },
        ],
        snippet: `const API_URL = new InjectionToken<string>('API_URL');\n// in component\nreadonly apiUrl = inject(API_URL);`
      },
      {
        title: 'Services & State in Services',
        diff: 2,
        subtopics: [
          { text: 'Creating services with @Injectable()' },
          { text: 'Singleton vs scoped services' },
          { text: 'Service-based state with BehaviorSubject' },
          { text: 'Service communication patterns' },
        ]
      },
    ]
  },
  {
    id: 'rxjs',
    title: 'RxJS & Reactive Programming',
    subtitle: 'Observables, Operators, Subjects — the reactive backbone',
    level: 'mid',
    topics: [
      {
        title: 'RxJS Fundamentals',
        diff: 3,
        subtopics: [
          { text: 'Observable, Observer, Subscription lifecycle' },
          { text: 'Cold vs Hot Observables' },
          { text: 'Creating — of, from, fromEvent, interval, timer, ajax' },
          { text: 'Subject, BehaviorSubject, ReplaySubject, AsyncSubject' },
        ]
      },
      {
        title: 'Higher-Order Operators',
        diff: 4,
        subtopics: [
          { text: 'switchMap — cancels previous inner observable', code: 'switchMap' },
          { text: 'mergeMap — concurrent inner observables', code: 'mergeMap' },
          { text: 'concatMap — sequential inner observables', code: 'concatMap' },
          { text: 'exhaustMap — ignores new while busy', code: 'exhaustMap' },
        ],
        snippet: `search$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap(q => this.api.search(q))\n).subscribe(...)`
      },
      {
        title: 'Filtering & Utility Operators',
        diff: 3,
        subtopics: [
          { text: 'filter, take, takeUntil, takeWhile, skip' },
          { text: 'debounceTime, throttleTime, distinctUntilChanged' },
          { text: 'tap, delay, finalize, retry, catchError' },
          { text: 'combineLatest, forkJoin, zip, withLatestFrom' },
          { text: 'shareReplay(1) — multicast + replay', code: 'shareReplay(1)' },
        ]
      },
      {
        title: 'Async Pipe & Memory Leaks',
        diff: 3,
        subtopics: [
          { text: 'async pipe — auto-subscribe & unsubscribe in template' },
          { text: 'takeUntil + Subject pattern for unsubscription' },
          { text: 'takeUntilDestroyed (Angular 16+)', code: 'takeUntilDestroyed' },
          { text: 'DestroyRef inject pattern', code: 'DestroyRef' },
        ]
      },
    ]
  },
  {
    id: 'forms',
    title: 'Forms (Template & Reactive)',
    subtitle: 'Validation, FormBuilder, dynamic forms, custom validators',
    level: 'mid',
    topics: [
      {
        title: 'Template-Driven Forms',
        diff: 2,
        subtopics: [
          { text: 'FormsModule, ngModel, ngModelGroup' },
          { text: 'Validation — required, minlength, maxlength, email' },
          { text: 'Form state — valid, invalid, pristine, dirty, touched' },
          { text: 'Template form submission and reset' },
        ]
      },
      {
        title: 'Reactive Forms',
        diff: 3,
        subtopics: [
          { text: 'FormControl, FormGroup, FormArray', code: 'ReactiveFormsModule' },
          { text: 'FormBuilder — .group(), .control(), .array()' },
          { text: 'valueChanges and statusChanges observables' },
          { text: 'patchValue vs setValue' },
          { text: 'Dynamic form controls — add/remove at runtime' },
          { text: 'FormArray for complex dynamic lists' },
        ],
        snippet: `this.form = this.fb.group({\n  name: ['', [Validators.required]],\n  skills: this.fb.array([])\n});`
      },
      {
        title: 'Validators & Cross-field Validation',
        diff: 3,
        subtopics: [
          { text: 'Built-in — Validators.required, min, max, email, pattern' },
          { text: 'Custom sync validators — ValidatorFn' },
          { text: 'Custom async validators — AsyncValidatorFn' },
          { text: 'Cross-field validators (e.g. password match)' },
          { text: 'setValidators, updateValueAndValidity' },
        ]
      },
    ]
  },
  {
    id: 'routing',
    title: 'Routing & Navigation',
    subtitle: 'Guards, lazy loading, resolvers, nested routes',
    level: 'mid',
    topics: [
      {
        title: 'Router Configuration',
        diff: 2,
        subtopics: [
          { text: 'Routes array — path, component, redirectTo, pathMatch' },
          { text: 'RouterLink, RouterLinkActive, routerLinkActiveOptions' },
          { text: 'Router.navigate() and navigateByUrl()' },
          { text: 'ActivatedRoute — params, queryParams, data, fragment' },
          { text: 'Named router outlets (auxiliary routes)' },
        ]
      },
      {
        title: 'Advanced Routing',
        diff: 3,
        subtopics: [
          { text: 'Lazy loading — loadComponent, loadChildren' },
          { text: 'Nested/child routes with router-outlet' },
          { text: 'Route guards — canActivateFn, canDeactivateFn, canMatchFn' },
          { text: 'Resolvers — pre-fetch data before component loads' },
          { text: 'Router events — NavigationStart, NavigationEnd' },
          { text: 'Preloading strategies — PreloadAllModules, custom' },
        ],
        snippet: `export const authGuard: CanActivateFn = (route, state) => {\n  const auth = inject(AuthService);\n  return auth.isLoggedIn ? true : redirect('/login');\n};`
      },
    ]
  },
  {
    id: 'state',
    title: 'State Management',
    subtitle: 'NgRx, Signals, component-level state patterns',
    level: 'advanced',
    topics: [
      {
        title: 'Angular Signals (v16+)',
        diff: 3,
        subtopics: [
          { text: 'signal(), computed(), effect() basics', code: 'signal()' },
          { text: 'Signals vs BehaviorSubject comparison' },
          { text: 'toSignal() and toObservable() interop', code: 'toSignal' },
          { text: 'input(), output() signal-based APIs (v17.1+)' },
          { text: 'Zoneless apps with signals' },
        ],
        snippet: `const count = signal(0);\nconst double = computed(() => count() * 2);\neffect(() => console.log(count()));`
      },
      {
        title: 'NgRx Store',
        diff: 4,
        subtopics: [
          { text: 'Actions, Reducers, Selectors, Effects pattern' },
          { text: 'createAction, createReducer, createSelector, createFeature' },
          { text: 'NgRx Effects — handling side effects' },
          { text: 'NgRx Entity — normalized state', code: 'EntityAdapter' },
          { text: 'NgRx ComponentStore — local state' },
          { text: 'NgRx SignalStore (v17+)', code: 'signalStore()' },
        ]
      },
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Optimization',
    subtitle: 'Change detection, @defer, SSR, bundle optimization',
    level: 'advanced',
    topics: [
      {
        title: 'Change Detection Optimization',
        diff: 4,
        subtopics: [
          { text: 'OnPush strategy — when it checks, what triggers it' },
          { text: 'markForCheck() vs detectChanges()' },
          { text: 'Zone.js — how it works and why it matters' },
          { text: 'Zoneless apps — provideExperimentalZonelessChangeDetection' },
          { text: 'Detaching change detector — ChangeDetectorRef.detach()' },
        ]
      },
      {
        title: '@defer — Deferrable Views (Angular 17+)',
        diff: 3,
        subtopics: [
          { text: '@defer block — lazy load component template chunks', code: '@defer' },
          { text: 'on idle, on viewport, on interaction, on hover, on timer' },
          { text: '@loading, @placeholder, @error blocks' },
          { text: 'prefetch condition — prefetch on idle' },
        ],
        snippet: `@defer (on viewport) {\n  <heavy-component />\n} @loading {\n  <spinner />\n} @placeholder {\n  <div>Soon...</div>\n}`
      },
      {
        title: 'Angular SSR & Hydration',
        diff: 4,
        subtopics: [
          { text: 'Angular Universal — Server-Side Rendering' },
          { text: 'Non-destructive hydration (Angular 16+)', code: 'provideClientHydration' },
          { text: 'TransferState — avoid duplicate HTTP calls' },
          { text: 'isPlatformBrowser / isPlatformServer guards' },
          { text: 'Static prerendering' },
        ]
      },
    ]
  },
  {
    id: 'expert',
    title: 'Expert & Architecture',
    subtitle: 'Testing, Interceptors, CDK, Dynamic Components, Patterns',
    level: 'expert',
    topics: [
      {
        title: 'Testing',
        diff: 4,
        subtopics: [
          { text: 'Unit testing — TestBed, createComponent, fixture' },
          { text: 'Mocking services — spyOn, jasmine.createSpy' },
          { text: 'HttpClientTestingModule, HttpTestingController' },
          { text: 'Testing RxJS — marble testing, TestScheduler' },
          { text: 'E2E with Cypress / Playwright' },
          { text: 'Testing NgRx — MockStore, provideMockStore' },
        ],
        snippet: `describe('MyService', () => {\n  beforeEach(() => TestBed.configureTestingModule({}));\n  it('should create', () => {\n    const s = TestBed.inject(MyService);\n    expect(s).toBeTruthy();\n  });\n});`
      },
      {
        title: 'HTTP Client & Interceptors',
        diff: 3,
        subtopics: [
          { text: 'HttpClient — GET, POST, PUT, DELETE, PATCH' },
          { text: 'HttpParams and HttpHeaders' },
          { text: 'Functional interceptors (Angular 15+)', code: 'HttpInterceptorFn' },
          { text: 'withInterceptors() in standalone apps' },
          { text: 'Retry logic with retry, retryWhen operators' },
        ]
      },
      {
        title: 'Advanced Component APIs',
        diff: 4,
        subtopics: [
          { text: 'Dynamic components — ViewContainerRef.createComponent()', code: 'createComponent' },
          { text: 'Host directives (Angular 15+)', code: 'hostDirectives' },
          { text: 'ElementRef, Renderer2 for DOM manipulation' },
          { text: 'ViewChild, ViewChildren, ContentChild, ContentChildren' },
          { text: 'Portal CDK — overlays, tooltips, dialogs' },
        ]
      },
      {
        title: 'Architecture Patterns',
        diff: 4,
        subtopics: [
          { text: 'Smart/Dumb (Container/Presentational) pattern' },
          { text: 'Facade pattern for state abstraction' },
          { text: 'Feature module / standalone feature architecture' },
          { text: 'Monorepo with Nx workspace' },
          { text: 'Creating reusable Angular libraries — ng-packagr' },
        ]
      },
    ]
  }
];

const LEVEL_CONFIG = {
  basic:    { cls: 'tag-basic',    label: 'FOUNDATIONAL' },
  mid:      { cls: 'tag-mid',      label: 'INTERMEDIATE' },
  advanced: { cls: 'tag-advanced', label: 'ADVANCED' },
  expert:   { cls: 'tag-expert',   label: 'EXPERT' },
};

const STORAGE_KEY = 'ng-roadmap-done';

// ─── Component ─────────────────────────────────────────────────
@Component({
  selector: 'app-roadmap',
  // standalone: true,
  // imports: [CommonModule, RouterModule],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapComponent implements OnInit {

  // ── State (Signals) ──
  phases = PHASES;
  levelConfig = LEVEL_CONFIG;
  activePhaseIndex = signal(0);
  expandedCards = signal<Set<string>>(new Set());
  completed = signal<Record<string, boolean>>({});

  // ── Computed ──
  activePhase = computed(() => this.phases[this.activePhaseIndex()]);

  totalTopics = computed(() =>
    this.phases.reduce((acc, p) => acc + p.topics.length, 0)
  );

  doneCount = computed(() =>
    Object.values(this.completed()).filter(Boolean).length
  );

  progressPct = computed(() =>
    this.totalTopics()
      ? Math.round((this.doneCount() / this.totalTopics()) * 100)
      : 0
  );

  // ── Lifecycle ──
  ngOnInit(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) this.completed.set(JSON.parse(saved));
    } catch { /* ignore */ }
  }

  // ── Helpers ──
  topicId(phaseIndex: number, topicIndex: number): string {
    return `${this.phases[phaseIndex].id}_t${topicIndex}`;
  }

  isDone(phaseIndex: number, topicIndex: number): boolean {
    return !!this.completed()[this.topicId(phaseIndex, topicIndex)];
  }

  isExpanded(tid: string): boolean {
    return this.expandedCards().has(tid);
  }

  isPhaseDone(phaseIndex: number): boolean {
    return this.phases[phaseIndex].topics.every(
      (_, ti) => this.completed()[this.topicId(phaseIndex, ti)]
    );
  }

  diffArray(diff: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  // ── Actions ──
  goPhase(index: number): void {
    if (index < 0 || index >= this.phases.length) return;
    this.activePhaseIndex.set(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleExpand(tid: string, event: Event): void {
    event.stopPropagation();
    const current = new Set(this.expandedCards());
    current.has(tid) ? current.delete(tid) : current.add(tid);
    this.expandedCards.set(current);
  }

  toggleDone(phaseIndex: number, topicIndex: number, event: Event): void {
    event.stopPropagation();
    const tid = this.topicId(phaseIndex, topicIndex);
    const updated = { ...this.completed(), [tid]: !this.completed()[tid] };
    this.completed.set(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  }
}