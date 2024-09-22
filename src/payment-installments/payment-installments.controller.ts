import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentInstallmentsService } from './payment-installments.service';
import { CreatePaymentInstallmentDto } from './dto/create-payment-installment.dto';
import { UpdatePaymentInstallmentDto } from './dto/update-payment-installment.dto';

@Controller('payment-installments')
export class PaymentInstallmentsController {
  constructor(
    private readonly paymentInstallmentsService: PaymentInstallmentsService,
  ) {}

  @Post()
  create(@Body() createPaymentInstallmentDto: CreatePaymentInstallmentDto) {
    return this.paymentInstallmentsService.create(createPaymentInstallmentDto);
  }

  @Get()
  findAll() {
    return this.paymentInstallmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentInstallmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentInstallmentDto: UpdatePaymentInstallmentDto,
  ) {
    return this.paymentInstallmentsService.update(
      +id,
      updatePaymentInstallmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentInstallmentsService.remove(+id);
  }
}
