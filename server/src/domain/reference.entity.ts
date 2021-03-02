/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Type } from './type.entity';
import { State } from './enumeration/state';

/**
 * A Reference.
 */
@Entity('reference')
export class Reference extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'value', nullable: true })
  value: string;

  @Column({ type: 'simple-enum', name: 'state', enum: State })
  state: State;

  @Column(type => Type)
  types: Type[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
