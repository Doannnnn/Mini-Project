package com.example.model.dto.reponse;

import com.example.model.Customer;
import com.example.model.EStatus;
import com.example.model.OrderDetail;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class OrderResDTO {

    private Long id;

    private BigDecimal total;

    private String shipping;

    private EStatus status;

    private CustomerResDTO customer;

    private Date orderDate;

    private List<OrderDetailResDTO> orderDetails;
}
