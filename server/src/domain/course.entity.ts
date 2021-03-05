/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Person } from './person.entity';

/**
 * A Course.
 */
@Entity('course')
export class Course extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'hour', nullable: true })
  hour: string;

  @Column({ name: 'grade', nullable: true })
  grade: string;

  @Column()
  teacher: string;

  @Column()
  students: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
