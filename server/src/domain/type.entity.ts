/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { State } from './enumeration/state';

/**
 * A Type.
 */
@Entity('type')
export class Type extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'value', nullable: true })
  value: string;

  @Column({ type: 'simple-enum', name: 'state', enum: State })
  state: State;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
