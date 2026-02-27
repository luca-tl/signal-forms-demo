import { Routes } from '@angular/router';
import { Introduction } from './pages/introduction.component';
import { DesignPhilosophy } from './pages/design-philosophy.component';
import { BasicExample } from './pages/basic-example.component';
import { FormModelDesign } from './pages/form-model-design.component';
import { FormStates } from './pages/form-states.component';
import { Validation } from './pages/validation.component';
import { CustomControls } from './pages/custom-controls.component';
import { WhatShouldWeUse } from './pages/what-should-we-use.component';
import { WebResources } from './pages/web-resources.component';

export const routes: Routes = [
  { path: '', redirectTo: 'introduction', pathMatch: 'full' },
  { path: 'introduction', component: Introduction },
  { path: 'design-philosophy', component: DesignPhilosophy },
  { path: 'basic-example', component: BasicExample },
  { path: 'form-model-design', component: FormModelDesign },
  { path: 'form-states', component: FormStates },
  { path: 'validation', component: Validation },
  { path: 'custom-controls', component: CustomControls },
  { path: 'what-should-we-use', component: WhatShouldWeUse },
  { path: 'web-resources', component: WebResources },
];
