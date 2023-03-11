import { IsDateString, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class TodoRequestDto {
  @IsNotEmpty()
  categoryId: number //ToDo아이디

  @IsString()
  @IsNotEmpty()
  @IsIn(['TODO', 'DONE'], {
    message: 'status는 TODO,DONE 만 가능합니다.'
  })
  @MaxLength(10)
  status: string //상태

  @IsString()
  @MaxLength(1000)
  memo: string

  @IsDateString()
  @IsNotEmpty()
  today: string
}