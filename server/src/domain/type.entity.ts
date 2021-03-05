/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Reference } from './reference.entity';
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

  @Column({ name: 'parent', nullable: true })
  parent: string;

  @Column({ type: 'simple-enum', name: 'state', enum: State })
  state: State;

  @Column()
  reference: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
