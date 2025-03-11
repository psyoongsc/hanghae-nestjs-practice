import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostingDocument = HydratedDocument<Posting>;

@Schema()
export class Posting {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    context: string;

    @Prop()
    postedDatetime: Date;

    @Prop()
    author: string;

    @Prop()
    password: string;
}

export const PostingSchema = SchemaFactory.createForClass(Posting);